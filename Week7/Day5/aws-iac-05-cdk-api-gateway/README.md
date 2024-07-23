# AWS API Gateway with CDK

We will add API Gateway between CloudFront and Lambda.

- We introduce API Gateway and use CDK to add one to the project.
- Then we add a lambda into it, and invoke the lambda under the unfriendly name.
- Then we link it to CloudFront and invoke it with the friendly name.

In breakouts we repeat adding more lambda integrations and call them through a browser.

## Objectives

- Understand what an API Gateway is
- How to use it in front of Lambda
- Invoking Lambdas via HTTP
- Wiring CF in front of API GW
- Invoking Lambdas via CF & API GW

## Timing

This session is designed to take 3.0 hrs (2 blocks).

## Access to AWS

For setting this up see [README-Instructor-technical-setup.md > AWS Setup section](../README-Instructor-technical-setup.md).

## AWS sessions list

- AWS + Cloud intro 01 ✅ _1.5hrs_
- AWS + Cloud intro 02 ✅ _1.5hrs_
- AWS 01 S3 - storage (manual) ✅ _1.5hrs_
- AWS 02 CDK intro - with S3 ✅ _3.0hrs_
- AWS 03 Cloudfront - get files out of s3 ✅ _1.5hrs_
- AWS 04 Lambda - running code ✅ _3.0hrs_
- AWS 05 Api Gateway - put an API in front of Lambda ⬅ _3.0hrs_
- AWS 06 Aurora Serverless Postgres - relational db _3.0hrs_
- AWS 07 DynamoDB - non-relational db _3.0hrs_

## Core Infrastructure prep

See [Instructor technical setup](./README-Instructor-technical-setup.md) > `Instructor Tooling` > `Core Infrastructure repo`.

- This core infra should be set up at the start of the Academy.
- These sessions will rely on that infra being ready.

## Files

- `exercises/*` for the starting point
- `solutions/*` for the Infini Gigs sample code (a few lambdas linked to API GW)

## Prep

- Export the presentation to PDF and the zip for distribution using `make generate-session-files f=session_name`
- This session relies on being done in the order above.
- The learners should start from the `./exercises` folder
- The sample stack the Instructor can use for reference is in `./solutions`

## Session

1. We will add API Gateway between CloudFront and Lambda.
1. Run the slide deck.
1. Copy code samples to share from the `./solutions` folders rather than the slides.
1. Get the learners to follow along with each step, checking after each that they don't have any mistakes.
1. The 2x 15m breakout sessions are designed as a deliberate repeat of the code-along tasks.
    1. Have small groups of ~3 people in each breakout.
    1. This can also be a project-time exercise if the session is overrunning.
