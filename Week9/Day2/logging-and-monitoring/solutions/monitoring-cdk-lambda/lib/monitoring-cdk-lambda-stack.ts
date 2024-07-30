import * as cdk from 'aws-cdk-lib'
import * as apigw from 'aws-cdk-lib/aws-apigateway'
import * as lambda from 'aws-cdk-lib/aws-lambda'
import * as iam from 'aws-cdk-lib/aws-iam'
import * as childProcess from 'child_process'

export class MonitoringCdkLambdaStack extends cdk.Stack {
  // Env vars
  teamVpcId = process.env.NJA_VPC_ID || 'NOT_SET'
  iwVpnIp = process.env.IW_VPN_IP || 'NOT_SET'
  yourName = process.env.MY_NAME || 'NOT_SET'
  teamSecurityGroupName = 'Nja-Shared-Security-Group'
  lambdaExecutionRoleName = 'nja-lambda-execution-role'
  stageName = 'v1'

  constructor(scope, id, props) {
    super(scope, id, props)

    // Resource policy for only over VPN
    const apiResourcePolicyVPN = new iam.PolicyDocument({
      statements: [
        new iam.PolicyStatement({
          actions: ['execute-api:Invoke'],
          principals: [new iam.AnyPrincipal()],
          resources: ['execute-api:/*/*/*'],
        }),
        new iam.PolicyStatement({
          effect: iam.Effect.DENY,
          principals: [new iam.AnyPrincipal()],
          actions: ['execute-api:Invoke'],
          resources: ['execute-api:/*/*/*'],
          conditions: {
            NotIpAddress: {
              'aws:SourceIp': [this.iwVpnIp],
            },
          },
        }),
      ],
    })

    // REST API Gateway
    const api = new apigw.RestApi(this, `${this.yourName}-monitoring-apigw`, {
      defaultCorsPreflightOptions: {
        allowOrigins: ['*'],
        allowMethods: apigw.Cors.ALL_METHODS,
      },
      deployOptions: {
        stageName: this.stageName,
      },
      policy: apiResourcePolicyVPN,
    })

    const lambdaExecutionRole = iam.Role.fromRoleName(
      this,
      `${this.yourName}-execution-role-monitoring`,
      this.lambdaExecutionRoleName
    )

    // Create a lambda
    const nameLambda = new lambda.Function(this, `${this.yourName}-monitoring-lambda`, {
      runtime: lambda.Runtime.NODEJS_14_X,
      code: lambdaAsset,
      handler: 'index.handler',
      role: lambdaExecutionRole,
      environment: {
        AWS_NODEJS_CONNECTION_REUSE_ENABLED: 'true',
      },
    })


    // Link Lambda to api
    const nameLambdaIntegration = new apigw.LambdaIntegration(nameLambda)

    const namesApi = api.root.addResource('names')
    namesApi.addMethod('GET', nameLambdaIntegration)
    namesApi.addMethod('POST', nameLambdaIntegration)
    namesApi.addMethod('PUT', nameLambdaIntegration)

    const metrics = api.root.addResource('metrics')
    metrics.addMethod('GET', nameLambdaIntegration)


    // Academites need a permission boundary
    const boundary = iam.ManagedPolicy.fromManagedPolicyName(
      this,
      'Boundary',
      'ScopePermissions'
    )
    iam.PermissionsBoundary.of(this).apply(boundary)

    // Output our API URL
    new cdk.CfnOutput(this, 'API_URL', {
      value: api.url ?? 'NO_URL',
    })

    new cdk.CfnOutput(this, 'API_URL_FULL', {
      value: `${api.url}api/`?? 'NO_URL',
    })
  }
}

const lambdaAsset = new lambda.AssetCode('functions', {
  bundling: {
    image: lambda.Runtime.NODEJS_14_X.bundlingImage,
    local: {
      tryBundle(outputDir: string) {
        const commands = [
          'cd functions',
          'rm -rf dist',
          'npm ci',
          'npm run build',
          `cp -r dist/* ${outputDir}`
        ]
        childProcess.execSync(commands.join(' && '))
        return true
      }
    }
  }
})
