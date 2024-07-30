import * as cdk from "aws-cdk-lib";
import * as apigw from "aws-cdk-lib/aws-apigateway";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as iam from "aws-cdk-lib/aws-iam";
import * as nodejs from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";

export class MonitoringCdkLambdaStack extends cdk.Stack {
  // Env vars
  yourName = process.env.MY_NAME || "NOT_SET";
  ipAddress = process.env.MY_IP_ADDRESS || "NOT_SET";
  //teamSecurityGroupName = 'Nja-Shared-Security-Group'
  //lambdaExecutionRoleName = 'nja-lambda-execution-role'
  teamSecurityGroupName = "SoT-Shared-Security-Group";
  lambdaExecutionRoleName = "sot-lambda-execution-role";
  stageName = "v1";

  constructor(scope: Construct, id: string, props: cdk.StackProps) {
    super(scope, id, props);

    // Resource policy for only over VPN
    const apiResourcePolicyVPN = new iam.PolicyDocument({
      statements: [
        new iam.PolicyStatement({
          actions: ["execute-api:Invoke"],
          principals: [new iam.AnyPrincipal()],
          resources: ["execute-api:/*/*/*"],
        }),
        // new iam.PolicyStatement({
        //   effect: iam.Effect.DENY,
        //   principals: [new iam.AnyPrincipal()],
        //   actions: ["execute-api:Invoke"],
        //   resources: ["execute-api:/*/*/*"],
        //   conditions: {
        //     NotIpAddress: {
        //       "aws:SourceIp": [this.ipAddress],
        //     },
        //   },
        // }),
      ],
    });

    // REST API Gateway
    const api = new apigw.RestApi(this, `${this.yourName}-monitoring-apigw`, {
      defaultCorsPreflightOptions: {
        allowOrigins: ["*"],
        allowMethods: apigw.Cors.ALL_METHODS,
      },
      deployOptions: {
        stageName: this.stageName,
      },
      policy: apiResourcePolicyVPN,
    });

    const lambdaExecutionRole = iam.Role.fromRoleName(
      this,
      `${this.yourName}-execution-role-monitoring`,
      this.lambdaExecutionRoleName
    );

    // Create a lambda
    const nameLambda = new nodejs.NodejsFunction(
      this,
      `${this.yourName}-monitoring-lambda`,
      {
        runtime: lambda.Runtime.NODEJS_16_X,
        entry: "functions/index.ts",
        handler: "handler",
        role: lambdaExecutionRole,
        environment: {
          AWS_NODEJS_CONNECTION_REUSE_ENABLED: "true",
        },
      }
    );

    // Link Lambda to api
    const nameLambdaIntegration = new apigw.LambdaIntegration(nameLambda);

    const namesApi = api.root.addResource("names");
    namesApi.addMethod("GET", nameLambdaIntegration);
    namesApi.addMethod("POST", nameLambdaIntegration);
    namesApi.addMethod("PUT", nameLambdaIntegration);

    const metrics = api.root.addResource("metrics");
    metrics.addMethod("GET", nameLambdaIntegration);

    // Academites need a permission boundary
    const boundary = iam.ManagedPolicy.fromManagedPolicyName(
      this,
      "Boundary",
      "ScopePermissions"
    );
    iam.PermissionsBoundary.of(this).apply(boundary);

    // Output our API URL
    new cdk.CfnOutput(this, "API_URL", {
      value: api.url ?? "NO_URL",
    });

    new cdk.CfnOutput(this, "API_URL_FULL", {
      value: `${api.url}api/` ?? "NO_URL",
    });
  }
}
