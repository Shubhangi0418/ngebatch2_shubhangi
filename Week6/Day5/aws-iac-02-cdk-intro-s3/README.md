# AWS CDK Introduction

Here we use CDK to setup an S3 bucket, to show it's repeatable and idempotent.

## Objectives

- Understand why we use IaC
- Understand what CDK is and why we use it
- Create a CDK stack using JavaScript
- Add an s3 bucket to the stack you create using AWS CDK

## Timing

This session is designed to take 3.0 hrs (2 blocks).

## Access to AWS

For setting this up see [README-Instructor-technical-setup.md > AWS Setup section](../README-Instructor-technical-setup.md).

## AWS sessions list

- AWS + Cloud intro 01 ✅ _1.5hrs_
- AWS + Cloud intro 02 ✅ _1.5hrs_
- AWS 01 S3 - storage (manual) ✅ _1.5hrs_
- AWS 02 CDK intro - with S3 ⬅ _3.0hrs_
- AWS 03 Cloudfront - get files out of s3 _1.5hrs_
- AWS 04 Lambda - running code _3.0hrs_
- AWS 05 Api Gateway - put an API in front of Lambda _3.0hrs_
- AWS 06 Aurora Serverless Postgres - relational db _3.0hrs_
- AWS 07 DynamoDB - non-relational db _3.0hrs_

## Core Infrastructure prep

See [Instructor technical setup](./README-Instructor-technical-setup.md) > `Instructor Tooling` > `Core Infrastructure repo`.

- This core infra should be set up at the start of the Academy.
- These sessions will rely on that infra being ready.

## Files

- `exercises/*` for the starting point
- `examples/*`
    - `markm-gigs-s3` this is what the Academite folders will be like, with the custom names
    - The named folder is also for a worked example up to but not including the Breakout task (so only flyers done)
- `solutions/*` for the Infini Gigs sample code
    - `cdk` this has the fully worked solution in it (so flyers and client done), in the generically names folder we use after this session

## Prep

- Export the presentation to PDF and the zip for distribution using `make generate-session-files f=session_name`
- This session relies on being done in the order above.
- The learners should start from the `./exercises` folder
- The sample stack the Instructor can use for reference is in the `./examples` and `./solutions`

## Session

1. We will server the Gig Flyers (with code-along tasks) and then the Client (breakout task).
1. Run the slide deck.
1. Copy code samples to share from the `./examples` and `./solutions` folders rather than the slides.
1. Get the learners to follow along with each step, checking after each that they don't have any mistakes.
1. The 30m breakout session is designed as a deliberate repeat of the code-along tasks.
    1. Have small groups of ~3 people in each breakout.
    1. This can also be a project-time exercise if the session is overrunning.
    1. The `./examples` folder is up to the start of this breakout (so only flyers done)
    1. The `./solutions` folder has the final state (so flyers and client done)
