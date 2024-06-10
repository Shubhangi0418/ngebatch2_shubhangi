#!/bin/sh

curl -X POST -d '{"person": "Luca", "age": "2"}' \
    -H 'content-type: application/json' \
    http://localhost:8080/profile
