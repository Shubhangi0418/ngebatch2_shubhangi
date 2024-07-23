# AWS Lambda with CDK

Here we use the AWS web Console to make a simple lambda and test it.

Then we make some with CDK and look at event, context, env vars, params and error handling.

## Objectives

- Understand the difference between monolithic and microservice architecture
- Use Lambda in the AWS Console
- Create & Invoke a Lambda
- Create a Lambda with CDK
- See the Event and Context objects
- Use environment variables and payload parameters
- Consider error handling

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
- AWS 04 Lambda - running code ⬅ _3.0hrs_
- AWS 05 Api Gateway - put an API in front of Lambda _3.0hrs_
- AWS 06 Aurora Serverless Postgres - relational db _3.0hrs_
- AWS 07 DynamoDB - non-relational db _3.0hrs_

## Core Infrastructure prep

See [Instructor technical setup](./README-Instructor-technical-setup.md) > `Instructor Tooling` > `Core Infrastructure repo`.

- This core infra should be set up at the start of the Academy.
- These sessions will rely on that infra being ready.

## Files

- `exercises/*` for the starting point
- `examples/*` for sample lambda bits of code and scripts
- `solutions/*` for the Infini Gigs sample code (a few lambdas done)

## Prep

- Export the presentation to PDF and the zip for distribution using `make generate-session-files f=session_name`
- This session relies on being done in the order above
- The learners should start from the `./exercises` folder
- The sample stack the Instructor can use for reference is in the `./solutions` folder

Some folks using ZSH or other bash shells may get output captured or transient on screen. For those folks they could set `PAGER=cat` or `AWS_PAGER=cat` or exported in their `~/.zshrc` file.

## Session

1. We will add one lambda in the console some basic lambdas in CDK.
1. Run the slide deck.
1. Copy code samples to share from the `./examples` and `./solutions` folders rather than the slides.
1. Get the learners to follow along with each step, checking after each that they don't have any mistakes.
1. The breakout session is designed as a deliberate repeat of the code-along tasks.
    1. Have small groups of ~3 people in each breakout.
    1. This can also be a project-time exercise if the session is overrunning.
