import * as cdk from 'aws-cdk-lib'
import { Construct } from 'constructs'
import * as iam from 'aws-cdk-lib/aws-iam'
import * as s3 from 'aws-cdk-lib/aws-s3'
import * as s3Deployment from 'aws-cdk-lib/aws-s3-deployment'
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront'
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins'
import * as acm from 'aws-cdk-lib/aws-certificatemanager'
import * as ec2 from 'aws-cdk-lib/aws-ec2'
import * as rds from 'aws-cdk-lib/aws-rds'
import * as lambda from 'aws-cdk-lib/aws-lambda'
import * as nodejs from 'aws-cdk-lib/aws-lambda-nodejs'
import * as apigw from 'aws-cdk-lib/aws-apigateway'
import * as route53 from 'aws-cdk-lib/aws-route53'
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb'

/*
   cdk.StackProps includes:
   {
     env?: {
       account?: string,
       region?: string,
     },
     stackName?: string,
   }
*/
export interface GigsSettings extends cdk.StackProps {
  certArn: string,
  permissionsBoundaryPolicyName: string,
  domainName: string,
  subDomain: string,
  dbName: string, // new
  vpcName: string, // new
}

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: GigsSettings) {
    super(scope, id, props)

    // The code that defines your stack goes here

    // to use in route 53 etc
    const fullDomain = `${props.subDomain}.${props.domainName}`
    const flyerDomain = `flyers-${props.subDomain}.${props.domainName}`

    // These ones are mine
    cdk.Tags.of(this).add('Name', props.stackName!)
    cdk.Tags.of(this).add('Academy', props.stackName!)

    // Set a permissions boundary
    const boundary = iam.ManagedPolicy.fromManagedPolicyName(
      this,
      'Boundary',
      props.permissionsBoundaryPolicyName
    )
    iam.PermissionsBoundary.of(this).apply(boundary)

    // Lookup cert for domain *.ngei-sot.academy
    const cert = acm.Certificate.fromCertificateArn(
      this,
      'cert',
      props.certArn,
    )

    // Bucket to put static flyer data in
    const flyersBucket = new s3.Bucket(this, 'flyers-hosting', {
      bucketName: `${props.subDomain}-flyers-hosting`,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL, // security
      encryption: s3.BucketEncryption.S3_MANAGED // security
    })
    flyersBucket.addToResourcePolicy( // security
      new iam.PolicyStatement({
        resources: [
          flyersBucket.arnForObjects('*'),
          flyersBucket.bucketArn
        ],
        actions: [ 's3:*' ],
        effect: iam.Effect.DENY,
        conditions: {
          Bool: { 'aws:SecureTransport': 'false' }
        },
        principals: [ new iam.AnyPrincipal() ],
      })
    )

    // Bucket to put static react code in later
    const clientBucket = new s3.Bucket(this, 'client-hosting', {
      bucketName: `${props.subDomain}-client-hosting`,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL, // security
      encryption: s3.BucketEncryption.S3_MANAGED // security
    })
    clientBucket.addToResourcePolicy( // security
      new iam.PolicyStatement({
        resources: [
          clientBucket.arnForObjects('*'),
          clientBucket.bucketArn
        ],
        actions: [ 's3:*' ],
        effect: iam.Effect.DENY,
        conditions: {
          Bool: { 'aws:SecureTransport': 'false' }
        },
        principals: [ new iam.AnyPrincipal() ],
      })
    )

    // Lookup shared vpc to put db in, so other things can find it
    // You can't use any tokens for Vpc.fromLookup() parameters :-(
    const sharedVpc = ec2.Vpc.fromLookup(this, 'vpc', {
      vpcName: props.vpcName,
      region: props!.env!.region,
    })

    // Db Cluster
    // database goes in the vpc so other stuff can find it
    const cluster = new rds.ServerlessCluster(this, 'rds-cluster',
      {
        engine: rds.DatabaseClusterEngine.auroraPostgres({
          version: rds.AuroraPostgresEngineVersion.VER_13_7
        }),
        parameterGroup: rds.ParameterGroup.fromParameterGroupName(
          this,
          'ParameterGroup',
          'default.aurora-postgresql13'
        ),
        defaultDatabaseName: props.dbName, // Specify the name of the DB
        vpc: sharedVpc,
        scaling: { autoPause: cdk.Duration.minutes(10) }, // Zero Prevents DB from pausing
        removalPolicy: cdk.RemovalPolicy.DESTROY,
      }
    )

    const lambdaEnvVars = {
      NODE_ENV: 'production',
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1', // AWS specific var to reuse TCP connection
      DB_NAME: props.dbName, // Same as in cluster above
      CLUSTER_ARN: cluster.clusterArn,
      SECRET_ARN: cluster.secret?.secretArn || 'NOT_SET', // Our cluster auto creates a secret, map the ARN to our lambda env for later
    }

    const bundling = {
      externalModules: ['aws-sdk'],
    }

    // Healthcheck api lambda
    const healthcheckLambda = new nodejs.NodejsFunction(this,
      'healthcheck-lambda',
      {
        functionName: `${props.subDomain}-healthcheck-lambda`,
        runtime: lambda.Runtime.NODEJS_16_X,
        entry: './functions/utility-lambdas.ts',
        handler: 'healthcheckGetHandler',
        environment: lambdaEnvVars,
        timeout: cdk.Duration.seconds(3), // default
        bundling,
      })

    // Lambda to bootstrap the database schema
    const bootstrapLambda = new nodejs.NodejsFunction(this, 'bootstrap-lambda',
      {
        // required so we can reliably invoke it by name
        // use domain name so it's lower case and matches the name in the Makefile
        functionName: `${props.subDomain}-bootstrap-lambda`,
        runtime: lambda.Runtime.NODEJS_16_X,
        entry: './functions/aurora-lambdas.ts',
        handler: 'bootstrapHandler',
        environment: lambdaEnvVars,
        timeout: cdk.Duration.minutes(1),
        bundling,
      }
    )

    // Lambdas to talk to the database
    // -- gigs --
    const getGigsLambda = new nodejs.NodejsFunction(this, 'get-gigs-lambda',
      {
        functionName: `${props.subDomain}-get-gigs-lambda`,
        runtime: lambda.Runtime.NODEJS_16_X,
        entry: './functions/aurora-lambdas.ts',
        handler: 'gigsGetHandler',
        environment: lambdaEnvVars,
        timeout: cdk.Duration.seconds(30),
        bundling,
      }
    )
    const postGigLambda = new nodejs.NodejsFunction(this, 'post-gig-lambda',
      {
        functionName: `${props.subDomain}-post-gig-lambda`,
        runtime: lambda.Runtime.NODEJS_16_X,
        entry: './functions/aurora-lambdas.ts',
        handler: 'gigPostHandler',
        environment: lambdaEnvVars,
        timeout: cdk.Duration.seconds(30),
        bundling,
      }
    )
    // -- users --
    const getUsersLambda = new nodejs.NodejsFunction(this, 'get-users-lambda',
      {
        functionName: `${props.subDomain}-get-users-lambda`,
        runtime: lambda.Runtime.NODEJS_16_X,
        entry: './functions/aurora-lambdas.ts',
        handler: 'usersGetHandler',
        environment: lambdaEnvVars,
        timeout: cdk.Duration.seconds(30),
        bundling,
      }
    )
    const postUserLambda = new nodejs.NodejsFunction(this, 'post-user-lambda',
      {
        functionName: `${props.subDomain}-post-user-lambda`,
        runtime: lambda.Runtime.NODEJS_16_X,
        entry: './functions/aurora-lambdas.ts',
        handler: 'userPostHandler',
        environment: lambdaEnvVars,
        timeout: cdk.Duration.seconds(30),
        bundling,
      }
    )
    // -- tickets --
    const getTicketsLambda = new nodejs.NodejsFunction(this, 'get-tickets-lambda',
      {
        functionName: `${props.subDomain}-get-tickets-lambda`,
        runtime: lambda.Runtime.NODEJS_16_X,
        entry: './functions/aurora-lambdas.ts',
        handler: 'ticketsGetHandler',
        environment: lambdaEnvVars,
        timeout: cdk.Duration.seconds(30),
        bundling,
      }
    )
    const postTicketLambda = new nodejs.NodejsFunction(this, 'post-ticket-lambda',
      {
        functionName: `${props.subDomain}-post-ticket-lambda`,
        runtime: lambda.Runtime.NODEJS_16_X,
        entry: './functions/aurora-lambdas.ts',
        handler: 'ticketPostHandler',
        environment: lambdaEnvVars,
        timeout: cdk.Duration.seconds(30),
        bundling,
      }
    )

    // Grant lambda security access to database
    cluster.grantDataApiAccess(bootstrapLambda)
    cluster.grantDataApiAccess(getGigsLambda)
    cluster.grantDataApiAccess(postGigLambda)
    cluster.grantDataApiAccess(getUsersLambda)
    cluster.grantDataApiAccess(postUserLambda)
    cluster.grantDataApiAccess(getTicketsLambda)
    cluster.grantDataApiAccess(postTicketLambda)

    // API GW.
    // Bootstrap should *not* be available in the API!
    const api = new apigw.RestApi(this, 'apigw',
      {
        description: `${props.subDomain}-apigw`,
        restApiName: `${props.subDomain}-apigw`,
        deployOptions: {
          stageName: 'api', // must be same as default route handing in Cloud Front Distribution below
        },
        deploy: true, // always deploy,
        // set up CORS
        defaultCorsPreflightOptions: {
          allowHeaders: [
            'Content-Type', 'Access-Control-Allow-Origin',
            'Access-Control-Request-Method', 'Access-Control-Request-Headers'
          ],
          allowMethods: [ 'OPTIONS', 'GET', 'POST', 'PUT', 'DELETE' ],
          allowCredentials: true,
          allowOrigins: [ '*' ], // Allow all. Could be [ 'http://localhost:3000', 'https://${fullDomain}' ],
        },
      })
    api.addUsagePlan('apigw-rate-limits', {
      name: `${props.subDomain}-apigw-rate-limits`,
      throttle: {
        rateLimit: 10,
        burstLimit: 5
      }
    })

    const healthcheckApi = api.root.addResource('healthcheck')
    healthcheckApi.addMethod(
      'GET',
      new apigw.LambdaIntegration(healthcheckLambda, { proxy: true }),
    )
    // gigs GET and PUT
    const gigsApi = api.root.addResource('gigs')
    gigsApi.addMethod(
      'GET',
      new apigw.LambdaIntegration(getGigsLambda, { proxy: true }),
    )
    gigsApi.addMethod(
      'POST',
      new apigw.LambdaIntegration(postGigLambda, { proxy: true }),
    )
    // users GET and PUT
    const usersApi = api.root.addResource('users')
    usersApi.addMethod(
      'GET',
      new apigw.LambdaIntegration(getUsersLambda, { proxy: true }),
    )
    usersApi.addMethod(
      'POST',
      new apigw.LambdaIntegration(postUserLambda, { proxy: true }),
    )
    // tickets GET and PUT
    const ticketsApi = api.root.addResource('tickets')
    ticketsApi.addMethod(
      'GET',
      new apigw.LambdaIntegration(getTicketsLambda, { proxy: true }),
    )
    ticketsApi.addMethod(
      'POST',
      new apigw.LambdaIntegration(postTicketLambda, { proxy: true }),
    )

    // Redirects lambda to send folks to the right place in cloudfront
    const redirectsFunction = new cloudfront.Function(this, 'redirects-function',
      {
        code: cloudfront.FunctionCode.fromFile({
          filePath: 'functions/redirects.js',
        }),
      }
    )

    // Cloudfront sits in front of S3 bucket
    const flyersDistribution = new cloudfront.Distribution(this, 'flyers-distribution',
      {
        defaultBehavior: {
          origin: new origins.S3Origin(flyersBucket),
          viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        },
        priceClass: cloudfront.PriceClass.PRICE_CLASS_100,
        defaultRootObject: 'index.html',
        domainNames: [ flyerDomain ],
        certificate: cert,
        webAclId: undefined, // Don't add firewall / VPN restriction,
      }
    )
    // Copy flyers into bucket - depends on both Bucket and Cloudfront Distribution
    new s3Deployment.BucketDeployment(this, 'flyers-deployment', {
      destinationBucket: flyersBucket,
      sources: [ s3Deployment.Source.asset('../gig-flyers') ], // relative to CDK folder
      retainOnDelete: false,
      distribution: flyersDistribution, // invalidate this
      distributionPaths: [ '/*' ], // invalidate everything
      prune: true,
      memoryLimit: 256, // in case folder is big
    })

    // Cloudfront sits in front of S3 bucket and the API GW
    const clientDistribution = new cloudfront.Distribution(this, 'client-distribution',
      {
        defaultBehavior: {
          origin: new origins.S3Origin(clientBucket),
          viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
          functionAssociations: [
            { // redirects handler
              eventType: cloudfront.FunctionEventType.VIEWER_REQUEST,
              function: redirectsFunction,
            },
          ],
          // allow query params from CF into the lambdas
          originRequestPolicy: new cloudfront.OriginRequestPolicy(this, 'request-policy', {
            queryStringBehavior: cloudfront.OriginRequestQueryStringBehavior.all()
          }),
        },
        additionalBehaviors: {
          '/api/*': { // must be same as default stage name above in ApiGW
            origin: new origins.HttpOrigin(
              `${api.restApiId}.execute-api.${props!.env!.region}.amazonaws.com`,
              {
                // should be empty so we don't add extra path info
                // else it won't match in the API-GW stage
                originPath: '/'
              }
            ),
            viewerProtocolPolicy:
              cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
            allowedMethods: cloudfront.AllowedMethods.ALLOW_ALL,
            cachePolicy: cloudfront.CachePolicy.CACHING_DISABLED,
          },
        },
        priceClass: cloudfront.PriceClass.PRICE_CLASS_100,
        defaultRootObject: 'index.html',
        domainNames: [ fullDomain ],
        certificate: cert,
        webAclId: undefined, // Don't add firewall / VPN restriction,
      }
    )
    // Copy react output into bucket - depends on both Bucket and Cloudfront Distribution
    new s3Deployment.BucketDeployment(this, 'client-deployment', {
      destinationBucket: clientBucket,
      sources: [ s3Deployment.Source.asset('../client/dist') ], // different per project, relative to CDK folder
      retainOnDelete: false,
      distribution: clientDistribution, // invalidate this
      distributionPaths: [ '/*' ], // invalidate everything
      prune: true,
      memoryLimit: 256 // react folder can be big
      // See https://github.com/aws/aws-cdk/issues/4058 and https://github.com/aws/aws-cdk/pull/4204/files
    })

    const zone = route53.HostedZone.fromLookup(this, 'zone', {
      domainName: props.domainName,
    })

    new route53.CnameRecord(this, 'client-record', {
      zone,
      domainName: clientDistribution.domainName,
      recordName: fullDomain,
    })
    new route53.CnameRecord(this, 'flyers-record', {
      zone,
      domainName: flyersDistribution.domainName,
      recordName: flyerDomain,
    })

    new cdk.CfnOutput(this, 'ClientBucketName', {
      value: clientBucket.bucketName,
    })
    new cdk.CfnOutput(this, 'FlyersBucketName', {
      value: flyersBucket.bucketName,
    })

    new cdk.CfnOutput(this, 'BootstrapLambda', {
      value: bootstrapLambda.functionName,
    })
    new cdk.CfnOutput(this, 'RawApiUrl', {
      value: api.url ?? 'NO_URL',
    })
    new cdk.CfnOutput(this, 'PrettyApiUrl', {
      value: `https://${fullDomain}/api/`,
    })
    new cdk.CfnOutput(this, 'ClientUrl', {
      value: `https://${fullDomain}`,
    })
    new cdk.CfnOutput(this, 'FlyersUrl', {
      value: `https://${flyerDomain}`,
    })
    new cdk.CfnOutput(this, 'FlyersExampleUrl', {
      value: `https://${flyerDomain}/gig-001-flyer.pdf`,
    })
  }
}
