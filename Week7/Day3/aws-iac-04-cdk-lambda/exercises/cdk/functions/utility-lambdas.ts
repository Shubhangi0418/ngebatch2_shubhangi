// Lambda code goes here
import { Context, APIGatewayProxyResult, APIGatewayEvent } from "aws-lambda";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as nodejs from "aws-cdk-lib/aws-lambda-nodejs";

export const gigsListHandler = async (
  event: APIGatewayEvent,
  context: Context
) => {
  console.log("gigsListHandler invoked");
  console.log("event is ", event);
  console.log("context is", context);
  return {
    status: "ok",
    list: ["Rolling Stones", "The Doors", "The Beatles"],
  };
};
