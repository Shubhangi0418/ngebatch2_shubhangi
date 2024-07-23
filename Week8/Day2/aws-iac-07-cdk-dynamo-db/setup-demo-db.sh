#!/usr/bin/env bash

echo "Setting up demo DynamoDB for illustrating scan vs query"

echo ""
echo "Creating demo table"

aws dynamodb create-table \
    --table-name demo \
    --attribute-definitions \
        AttributeName=PK,AttributeType=S \
        AttributeName=SK,AttributeType=S \
    --key-schema \
        AttributeName=PK,KeyType=HASH \
        AttributeName=SK,KeyType=RANGE \
    --billing-mode PAY_PER_REQUEST

echo ""
echo "Populating demo table with items"

aws dynamodb batch-write-item \
    --request-items \
    '{
        "demo": [
          {
            "PutRequest": {
              "Item": {
                "PK": {"S": "customer#12345"},
                "SK": {"S": "records"},
                "Name": {"S": "Joe Bloggs"},
                "address": {"S": "18 Example Street, Leeds"}
              }
            }
          },
          {
            "PutRequest": {
              "Item": {
                "PK": {"S": "customer#12345"},
                "SK": {"S": "tickets#1"},
                "gig_id": {"S": "3456"},
                "seat": {"S": "C12"}
              }
            }
          },
          {
            "PutRequest": {
              "Item": {
                "PK": {"S": "customer#12345"},
                "SK": {"S": "tickets#2"},
                "gig_id": {"S": "6789"},
                "seat": {"S": "standing"}
              }
            }
          },
          {
            "PutRequest": {
              "Item": {
                "PK": {"S": "customer#98765"},
                "SK": {"S": "records"},
                "Name": {"S": "Alice Blah"},
                "phone": {"S": "4479123456"}
              }
            }
          },
          {
            "PutRequest": {
              "Item": {
                "PK": {"S": "customer#98765"},
                "SK": {"S": "tickets#1"},
                "gig_id": {"S": "3456"},
                "seat": {"S": "B22"}
              }
            }
          }
        ]
    }' \
   

echo ""
