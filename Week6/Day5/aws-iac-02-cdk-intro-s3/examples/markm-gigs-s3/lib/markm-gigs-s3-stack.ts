import * as cdk from 'aws-cdk-lib'
import { Construct } from 'constructs'
import * as iam from 'aws-cdk-lib/aws-iam'
import * as s3 from 'aws-cdk-lib/aws-s3'
import * as s3Deployment from 'aws-cdk-lib/aws-s3-deployment'

export interface GigsSettings extends cdk.StackProps {
  permissionsBoundaryPolicyName: string,
  subDomain: string,
}

export class MarkmGigsS3Stack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: GigsSettings) {
    super(scope, id, props)

    // The code that defines your stack goes here

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

    // Copy flyers into bucket
    new s3Deployment.BucketDeployment(this, 'flyers-deployment', {
      destinationBucket: flyersBucket,
      sources: [ s3Deployment.Source.asset('../gig-flyers') ], // relative to CDK folder
      retainOnDelete: false,
      prune: true,
      memoryLimit: 256, // in case folder is big
    })
    
    // Outputs - typical things are Name, ARNs, IDs, DNS, etc
    new cdk.CfnOutput(this, 'FlyersBucketName', {
      value: flyersBucket.bucketName,
    })

    // TODO (See Solution): Add the Client ./build folder bucket and deployment and output
  }
}
