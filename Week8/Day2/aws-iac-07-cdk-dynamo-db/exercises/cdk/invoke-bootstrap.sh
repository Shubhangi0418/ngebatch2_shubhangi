#!/usr/bin/env bash

# See also https://stackoverflow.com/questions/2264428/how-to-convert-a-string-to-lower-case-in-bash - the bash4 version does not work on lots of macs

echo ""
echo "Invoke boostrap for GIGS_STACK_NAME=${GIGS_STACK_NAME}"

gigs_stack_name_lower=$(echo "$GIGS_STACK_NAME" | tr '[:upper:]' '[:lower:]')
sub_domain=${gigs_stack_name_lower}
lambda_name="${sub_domain}-bootstrap-lambda"

echo "lambda_name=${lambda_name}"
echo ""

aws lambda invoke --function-name "${lambda_name}" \
    invoke-output.txt

echo ""
cat invoke-output.txt
echo ""
