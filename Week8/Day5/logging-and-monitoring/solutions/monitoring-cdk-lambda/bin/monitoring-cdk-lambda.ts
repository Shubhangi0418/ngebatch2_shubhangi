#!/usr/bin/env node

import * as cdk from 'aws-cdk-lib'
import { MonitoringCdkLambdaStack } from '../lib/monitoring-cdk-lambda-stack'

const app = new cdk.App()
new MonitoringCdkLambdaStack(app, `${process.env.MY_NAME}-monitoring-stack`, {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
})
