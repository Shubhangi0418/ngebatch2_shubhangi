import { Context, APIGatewayProxyResult, APIGatewayEvent } 
  from 'aws-lambda'

const myDatabaseCall = () => {
  throw new Error('I have sensitive data')
}

const badHandler = async (event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult> => {
  try {
    
    const result = myDatabaseCall()
    return result // this won't happen!
    
  } catch (error) {
    console.log('Never send the error out!', error)
    const errResponse = {
      statusCode: 500,
      body: {
        status: 'Error',
        message: 'There was an error, please contact support'
      },
    }
    return errResponse
  }
}

export {}
