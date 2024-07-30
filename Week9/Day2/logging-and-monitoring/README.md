# Logging and Monitoring

## Objectives

- Understand how we can log and monitor our infrastructure in AWS
- Understand logging and logging libraries
- Understand how we can log and monitor our local applications
- Be familiar with metrics and dashboards with examples (Prometheus and Grafana)

## Prep

- The first session will focus on exploring the usage of AWS monitoring and logging tools along with some breakout exercises.

- The second session will then use the exercises in this folder to bring up a small stack containing lambda that can be deployed, and a docker-compose file that will bring up:
    - Grafana : 3000
    - Prometheus : 9090
    - Names-app : 9091
This stack is all set up to scrape itself and grafana can be set up to use prometheus as the data source. The aim of the second session is to get them to try making their own custom metrics in the code (there are 2 examples in there already) and then turning them into a grafana dashboard.
- Export the presentation to PDF and the zip for distribution using `make generate-session-files f=session_name`

## Session

1. Run the slide deck
1. Move between the slides and the AWS console to show the features you are talking about.
