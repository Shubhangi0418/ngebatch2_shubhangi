import * as lambda from 'aws-lambda'

import {
  timestampText,
  responseToApiGw,
} from './common'

// API methods
export const healthcheckGetHandler = async (event: lambda.APIGatewayProxyEventV2): Promise<lambda.APIGatewayProxyResultV2> => {
  console.log('healthcheckGetHandler called: event:', event)
  const responseData = {
    timestamp: timestampText(),
    success: 'Hello'
  }
  return responseToApiGw(200, responseData)
}
