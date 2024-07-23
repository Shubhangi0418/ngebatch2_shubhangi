#!/bin/bash

FUNCTION_NAME=${1:-"SET_THE_NAME_WHEN_CALLING"}

echo ""
echo "Invoking ${FUNCTION_NAME}..."
echo ""

aws lambda invoke --function-name ${FUNCTION_NAME} \
    --payload '{"gigLocation": "Manchester", "gigId": "123"}' \
    --cli-binary-format raw-in-base64-out \
    invoke-output.txt

echo ""
cat invoke-output.txt
echo ""
