# The names app

This project is a backend server that is brought up alongside a prometheus and grafana container. All of these should be linked up and currently there will be 2 custom prometheus metrics being tracked which can be found in the functions/metrics.js file.

There is a Makefile that you can use to bring up all the services and instant logs using docker-compose.

It can also be deployed using CDK but it has not been fully tested regarding whether grafana and prometheus can access it, but it can be used to demonstrate the console logs that can appear in the cloudwatch logs so can technically be used for both parts of the session.

## Getting Started

You'll need to modify the permissions of the prometheus config:

```bash
cd prometheus/
chmod a+r prometheus.conf
```

## Useful commands

- `npm run test`         perform the jest unit tests
- `npx cdk deploy`           deploy this stack to your default AWS account/region
- `npx cdk diff`             compare deployed stack with current state
- `npx cdk synth`            emits the synthesized CloudFormation template
- `make up`              Brings up the 3 docker containers using docker compose
