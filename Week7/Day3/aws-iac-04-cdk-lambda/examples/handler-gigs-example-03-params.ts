import { Context, APIGatewayProxyResult, APIGatewayEvent } 
  from 'aws-lambda'

const doSomethingElse = (event, context) => {
  console.log(`EVENT: ${JSON.stringify(event)}`)
  console.log(`CONTEXT: ${JSON.stringify(context)}`)
  console.log(`Best gig is ${process.env.FAVOURITE_GIG}`)
  console.log('more code here')
}

export const gigsListHandler = async (event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult> => {
  console.log('gigsListHandler invoked')
  doSomethingElse(event, context)
  return {
    status: 'ok',
    list: [ 'Rolling Stones', 'The Doors', 'The Beatles' ],
  }
}

export const postGigsHandler = async (event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult> => {
  console.log('postGigsHandler invoked', event, context)
  const gigId = event.gigId || 'NOT_SET'
  const gigLocation = event.gigLocation || 'NOT_SET'
  console.log(`PARAMS: gigId = ${gigId}`)
  console.log(`PARAMS: gigLocation = ${gigLocation}`)
  return {
    status: 'ok'
  }
}

export {}
