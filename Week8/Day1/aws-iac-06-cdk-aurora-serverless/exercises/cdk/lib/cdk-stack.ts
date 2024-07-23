import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as iam from "aws-cdk-lib/aws-iam";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as s3Deployment from "aws-cdk-lib/aws-s3-deployment";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as origins from "aws-cdk-lib/aws-cloudfront-origins";
import * as acm from "aws-cdk-lib/aws-certificatemanager";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as nodejs from "aws-cdk-lib/aws-lambda-nodejs";
import * as apigw from "aws-cdk-lib/aws-apigateway";
import * as route53 from "aws-cdk-lib/aws-route53";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as rds from "aws-cdk-lib/aws-rds";

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
  certArn: string;
  permissionsBoundaryPolicyName: string;
  domainName: string;
  subDomain: string;
  env: {
    account: string;
    region: string;
  };
  dbName: string;
  vpcName: string;
}

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: GigsSettings) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // to use in route 53 etc
    const fullDomain = `${props.subDomain}.${props.domainName}`;
    const flyerDomain = `flyers-${props.subDomain}.${props.domainName}`;

    // These ones are mine
    cdk.Tags.of(this).add("Name", props.stackName!);
    cdk.Tags.of(this).add("Academy", props.stackName!);

    // Set a permissions boundary
    const boundary = iam.ManagedPolicy.fromManagedPolicyName(
      this,
      "Boundary",
      props.permissionsBoundaryPolicyName
    );
    iam.PermissionsBoundary.of(this).apply(boundary);

    // Lookup cert for domain *.ngei-sot.academy
    const cert = acm.Certificate.fromCertificateArn(
      this,
      "cert",
      props.certArn
    );

    // Bucket to put static flyer data in
    const flyersBucket = new s3.Bucket(this, "flyers-hosting", {
      bucketName: `${props.subDomain}-flyers-hosting`,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL, // security
      encryption: s3.BucketEncryption.S3_MANAGED, // security
    });
    flyersBucket.addToResourcePolicy(
      // security
      new iam.PolicyStatement({
        resources: [flyersBucket.arnForObjects("*"), flyersBucket.bucketArn],
        actions: ["s3:*"],
        effect: iam.Effect.DENY,
        conditions: {
          Bool: { "aws:SecureTransport": "false" },
        },
        principals: [new iam.AnyPrincipal()],
      })
    );

    // Bucket to put static react code in later
    const clientBucket = new s3.Bucket(this, "client-hosting", {
      bucketName: `${props.subDomain}-client-hosting`,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL, // security
      encryption: s3.BucketEncryption.S3_MANAGED, // security
    });
    clientBucket.addToResourcePolicy(
      // security
      new iam.PolicyStatement({
        resources: [clientBucket.arnForObjects("*"), clientBucket.bucketArn],
        actions: ["s3:*"],
        effect: iam.Effect.DENY,
        conditions: {
          Bool: { "aws:SecureTransport": "false" },
        },
        principals: [new iam.AnyPrincipal()],
      })
    );

    // Networking lookup
    // TODO
    const sharedVpc = ec2.Vpc.fromLookup(this, "vpc", {
      vpcName: props.vpcName,
      region: props.env!.region,
    });

    // Db Cluster
    const cluster = new rds.ServerlessCluster(this, "rdscluster", {
      engine: rds.DatabaseClusterEngine.auroraPostgres({
        version: rds.AuroraPostgresEngineVersion.VER_13_7,
      }),
      parameterGroup: rds.ParameterGroup.fromParameterGroupName(
        this,
        "ParameterGroup",
        "default.aurora-postgresql13"
      ),
      defaultDatabaseName: props.dbName, // name of the DB
      vpc: sharedVpc,
      scaling: { autoPause: cdk.Duration.minutes(10) },
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    const lambdaEnvVars = {
      NODE_ENV: "production",
      // AWS specific var to reuse TCP connection
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      // -- other settings plus -- //
      DB_NAME: props.dbName, // Same as in cluster above
      CLUSTER_ARN: cluster.clusterArn,
      SECRET_ARN: cluster.secret?.secretArn || "NOT_SET",
    };

    const bundling = {
      externalModules: ["aws-sdk"],
    };

    // Healthcheck api lambda
    const healthcheckLambda = new nodejs.NodejsFunction(
      this,
      "healthcheck-lambda",
      {
        functionName: `${props.subDomain}-healthcheck-lambda`,
        runtime: lambda.Runtime.NODEJS_16_X,
        entry: "./functions/utility-lambdas.ts",
        handler: "healthcheckGetHandler",
        environment: lambdaEnvVars,
        timeout: cdk.Duration.seconds(3), // default
        bundling,
      }
    );

    // Lambda to bootstrap the database schema
    const bootstrapLambda = new nodejs.NodejsFunction(
      this,
      "bootstrap-lambda",
      {
        // required so we can reliably invoke it by name
        // use domain name so it's lower case and matches the name in the Makefile
        functionName: `${props.subDomain}-bootstrap-lambda`,
        runtime: lambda.Runtime.NODEJS_16_X,
        entry: "./functions/aurora-lambdas.ts",
        handler: "bootstrapHandler",
        environment: lambdaEnvVars,
        timeout: cdk.Duration.minutes(1),
        bundling,
      }
    );

    // Lambdas to talk to the database
    // -- gigs --
    const getGigsLambda = new nodejs.NodejsFunction(this, "get-gigs-lambda", {
      functionName: `${props.subDomain}-get-gigs-lambda`,
      runtime: lambda.Runtime.NODEJS_16_X,
      entry: "./functions/aurora-lambdas.ts",
      handler: "gigsGetHandler",
      environment: lambdaEnvVars,
      timeout: cdk.Duration.seconds(30),
      bundling,
    });
    const postGigLambda = new nodejs.NodejsFunction(this, "post-gig-lambda", {
      functionName: `${props.subDomain}-post-gig-lambda`,
      runtime: lambda.Runtime.NODEJS_16_X,
      entry: "./functions/aurora-lambdas.ts",
      handler: "gigPostHandler",
      environment: lambdaEnvVars,
      timeout: cdk.Duration.seconds(30),
      bundling,
    });
    // -- users --
    const getUsersLambda = new nodejs.NodejsFunction(this, "get-users-lambda", {
      functionName: `${props.subDomain}-get-users-lambda`,
      runtime: lambda.Runtime.NODEJS_16_X,
      entry: "./functions/aurora-lambdas.ts",
      handler: "usersGetHandler",
      environment: lambdaEnvVars,
      timeout: cdk.Duration.seconds(30),
      bundling,
    });
    const postUserLambda = new nodejs.NodejsFunction(this, "post-user-lambda", {
      functionName: `${props.subDomain}-post-user-lambda`,
      runtime: lambda.Runtime.NODEJS_16_X,
      entry: "./functions/aurora-lambdas.ts",
      handler: "userPostHandler",
      environment: lambdaEnvVars,
      timeout: cdk.Duration.seconds(30),
      bundling,
    });
    // -- tickets --
    const getTicketsLambda = new nodejs.NodejsFunction(
      this,
      "get-tickets-lambda",
      {
        functionName: `${props.subDomain}-get-tickets-lambda`,
        runtime: lambda.Runtime.NODEJS_16_X,
        entry: "./functions/aurora-lambdas.ts",
        handler: "ticketsGetHandler",
        environment: lambdaEnvVars,
        timeout: cdk.Duration.seconds(30),
        bundling,
      }
    );
    const postTicketLambda = new nodejs.NodejsFunction(
      this,
      "post-ticket-lambda",
      {
        functionName: `${props.subDomain}-post-ticket-lambda`,
        runtime: lambda.Runtime.NODEJS_16_X,
        entry: "./functions/aurora-lambdas.ts",
        handler: "ticketPostHandler",
        environment: lambdaEnvVars,
        timeout: cdk.Duration.seconds(30),
        bundling,
      }
    );

    // Grant lambda security access to database
    cluster.grantDataApiAccess(bootstrapLambda);
    cluster.grantDataApiAccess(getGigsLambda);
    cluster.grantDataApiAccess(postGigLambda);
    cluster.grantDataApiAccess(getUsersLambda);
    cluster.grantDataApiAccess(postUserLambda);
    cluster.grantDataApiAccess(getTicketsLambda);
    cluster.grantDataApiAccess(postTicketLambda);

    // API GW.
    // Bootstrap should *not* be available in the API!
    const api = new apigw.RestApi(this, "apigw", {
      description: `${props.subDomain}-apigw`,
      restApiName: `${props.subDomain}-apigw`,
      deployOptions: {
        stageName: "api", // must be same as default route handing in Cloud Front Distribution below
      },
      deploy: true, // always deploy,
      // set up CORS
      defaultCorsPreflightOptions: {
        allowHeaders: [
          "Content-Type",
          "Access-Control-Allow-Origin",
          "Access-Control-Request-Method",
          "Access-Control-Request-Headers",
        ],
        allowMethods: ["OPTIONS", "GET", "POST", "PUT", "DELETE"],
        allowCredentials: true,
        allowOrigins: ["*"], // Allow all. Could be [ 'http://localhost:3000', 'https://${fullDomain}' ],
      },
    });
    api.addUsagePlan("apigw-rate-limits", {
      name: `${props.subDomain}-apigw-rate-limits`,
      throttle: {
        rateLimit: 10,
        burstLimit: 5,
      },
    });
  }
}
