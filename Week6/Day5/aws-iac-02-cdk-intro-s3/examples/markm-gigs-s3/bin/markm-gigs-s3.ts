#!/usr/bin/env node
import 'source-map-support/register'
import * as cdk from 'aws-cdk-lib'
import { MarkmGigsS3Stack, GigsSettings } from '../lib/markm-gigs-s3-stack'

const stackName: string = process.env.GIGS_STACK_NAME || ''
if (!(stackName && stackName.trim() && stackName.trim().length > 0)) {
  console.error(`PARAMETER $GIGS_STACK_NAME NOT SET, got: '${stackName}'`)
  process.exit(1)
}

const settings: GigsSettings = {
  // Inherited from cdk.StackProps
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT || 'NOT_SET',
    region: process.env.CDK_DEFAULT_REGION || 'NOT_SET',
  },
  stackName: stackName,
  permissionsBoundaryPolicyName: 'ScopePermissions',
  subDomain: stackName.toLowerCase(),
  // in later sessions we will add more settings
}

const app = new cdk.App()
new MarkmGigsS3Stack(app, `${settings.stackName}-TS-CdkStack`, settings)
