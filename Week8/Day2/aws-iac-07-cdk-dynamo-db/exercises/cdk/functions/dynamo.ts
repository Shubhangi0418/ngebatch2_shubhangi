import * as awsSdk from "aws-sdk";
awsSdk.config.update({ region: process.env.DYNAMO_REGION || "NOT_SET" });

const client = new awsSdk.DynamoDB.DocumentClient();

const dynamoTableName = process.env.DYNAMO_TABLE_NAME || "NOT_SET";

import { gigDataToLoad } from "./dynamo-gig-data";

export const bootstrapGigData = async (): Promise<number> => {
  console.log("bootstrapGigData: called");

  // max of 25 records per batch put
  const putRequests = gigDataToLoad.map((record: any) => ({
    PutRequest: {
      Item: record,
    },
  }));
  const numberItems = putRequests.length;
  console.log(`bootstrapGigData: saving ${numberItems} items`);

  const batchData = {
    RequestItems: {
      [dynamoTableName]: putRequests, // dynamic table name
    },
  };

  const result = await client.batchWrite(batchData).promise();
  console.log("bootstrapGigData: result", result);
  return numberItems;
};

export const getGigDataList = async (): Promise<any> => {
  console.log("getGigDataList: called");

  const params = {
    TableName: dynamoTableName,
  };
  const result = await client.scan(params).promise();
  /*
  result = {
    "Count": 8,
    "ScannedCount": 8,
    Items: [ {},  {} , {}, ...]
  }
  i.e. Items is an array of objects, one per row
  */
  console.log("getGigDataList: result", result);
  return result;
};

export const getGigDataById = async (gigId: string): Promise<any> => {
  console.log("getGigDataById called with:", gigId);

  const params = {
    TableName: dynamoTableName,

    Key: { gig_id: parseInt(gigId) },
  };

  const result = await client.get(params).promise();

  // ...logging or processing here then...

  // return result

  // const result = 'TODO'
  /* should look like this:
  result = {
    Item: {
      gig_id: 1,
      location: 'The Wardrobe', 
      data: { menu: {a}, food: {b} }, 
    }
  }
  */
  console.log("getGigDataById result:", result);
  return result;
};

export const postGigData = async (gigObject: any): Promise<any> => {
  console.log("postGigData called with", gigObject);
  /* should look like this:
    {
      "gig_id": 1,
      "location": "The Wardrobe",
      "data": {
          "menu": { "burger": 9.99, "falafel": 7.99 }
      }
    }
  */
  const params = {
    Item: null,
  };

  const result = "TODO";
  console.log("postGigData result", result);
  return { created: params.Item };
};
