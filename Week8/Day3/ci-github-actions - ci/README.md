# NPM Packaging with GitHub Actions

This session includes "Introduction to CI/CD" and then CI workshop in GitHub

All Academites should make a new GitHub repo like "markm-ci-cd" in the relevant org for use in this session and the `cd-github-actions` session. For IW this org is "IW-Academy" but for Sainsburys there is a different one.

## Objectives

- Try NPM Packaging

## Objectives

- Intro to CI/CD concepts
- Use GitHub Actions (GitHub Actions)
- Use GitHub Actions on Push
- Use GitHub Actions on Merge
- Automatically Unit Test our code

## Notes

The extra session [./ci-github-actions-npm-packaging.md](./ci-github-actions-npm-packaging.md) has been split out from this one.

It can be used as an advanced optional session - but the session was taking too long so we have deprecated that part.

## Prep

- Export the presentation to PDF and the zip for distribution using `make generate-session-files f=session_name`
- Our code samples are in the `./exercises` folder
- Get everyone to clone this in advance.

## Session

_Sainsbury's_: Make sure everyone has a repo to use, or make a new one here.

_Neil Jennings Academy_: Make sure everyone uses their existing repo in the `IW-Academy` github org.

All the Tasks can be done in breakouts with the Academites helping each other.

Use the emoji checks to make sure:

- Everyone has the demo files copied in correctly
- Everyone commits and pushes
- Everyone puts `./github/workflows` in the root of their projects
- The paths they put in the `*.yml` file match where the put the pokemon app folder

### End of session

- Using the above as a guide, suggest getting the Unit Tests in the team projects automatically tested!
