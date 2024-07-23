import { Context, APIGatewayProxyResult, APIGatewayEvent } 
  from 'aws-lambda'

const doSomethingElse = (event, context) => {
  console.log(`EVENT: ${JSON.stringify(event)}`)
  console.log(`CONTEXT: ${JSON.stringify(context)}`)
  console.log('more code here')
}

export const gigsListHandler = async (event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult> => {
  console.log('gigsListHandler invoked')
  return {
    status: 'ok',
    list: [ 'Rolling Stones', 'The Doors', 'The Beatles' ],
  }
}

export {}
