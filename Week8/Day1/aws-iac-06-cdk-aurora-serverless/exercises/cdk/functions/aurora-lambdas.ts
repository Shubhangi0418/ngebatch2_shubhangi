import {
  checkKeys,
  timestampText,
  responseToApiGw,
  responseToApiGwWithError,
  LambdaResult,
  LambdaEvent,
} from './common'

import {
  gigFields,
  userFields,
  ticketFields,
  getGigs,
  getTickets,
  getUsers,
  postGig,
  postTicket,
  postUser,
  bootstrap,
} from './db'

// API methods that calls the DB methods

export const gigsGetHandler = async (): LambdaResult => {
  console.log('GET /api/gigs: called')
  try {
    const rows = await getGigs()
    return responseToApiGw(200, rows)
  } catch (error) {
    console.log('GET /api/gigs: error:', error)
    return responseToApiGwWithError(500, 'Error getting gigs, check server logs')
  }
}

export const usersGetHandler = async (): LambdaResult => {
  console.log('GET /api/users: called')
  try {
    const rows = await getUsers()
    return responseToApiGw(200, rows)
  } catch (error) {
    console.log('GET /api/users: error:', error)
    return responseToApiGwWithError(500, 'Error getting users, check server logs')
  }
}

export const ticketsGetHandler = async (): LambdaResult => {
  console.log('GET /api/tickets: called')
  try {
    const rows = await getTickets()
    return responseToApiGw(200, rows)
  } catch (error) {
    console.log('GET /api/tickets: error:', error)
    return responseToApiGwWithError(500, 'Error getting tickets, check server logs')
  }
}

export const gigPostHandler = async (event: LambdaEvent): LambdaResult => {
  console.log('POST /api/gigs called')

  const dataText = event.body || '{}' // req.body
  console.log('POST /api/gigs: event.body=', dataText)
  const dataObject = JSON.parse(dataText)
  console.log('POST /api/gigs: Object=', dataObject)

  if (!checkKeys(gigFields, dataObject)) {
    console.log('POST /api/gigs bad result, fields=', gigFields, ' not in object=', dataObject)
    const result = responseToApiGwWithError(400, 'Bad Request (body), check server logs')
    console.log('POST /api/gigs result', result)
    return result
  }

  try {
    const postResponse = await postGig(dataObject)
    const result = responseToApiGw(200, postResponse)
    console.log('POST /api/gigs result', result)
    return result
  } catch (error) {
    console.log('POST /api/gigs: error:', error)
    return responseToApiGwWithError(500, 'Error putting gig, check server logs')
  }
}

export const userPostHandler = async (event: LambdaEvent): LambdaResult => {
  console.log('POST /api/users called')

  const dataText = event.body || '{}' // req.body
  console.log('POST /api/users: event.body=', dataText)
  const dataObject = JSON.parse(dataText)
  console.log('POST /api/users: Object=', dataObject)

  if (!checkKeys(userFields, dataObject)) {
    console.log('POST /api/users bad result, fields=', userFields, ' not in object=', dataObject)
    const result = responseToApiGwWithError(400, 'Bad Request (body), check server logs')
    console.log('POST /api/users result', result)
    return result
  }

  try {
    const postResponse = await postUser(dataObject)
    const result = responseToApiGw(200, postResponse)
    console.log('POST /api/users result', result)
    return result
  } catch (error) {
    console.log('POST /api/users: error:', error)
    return responseToApiGwWithError(500, 'Error putting user, check server logs')
  }
}

export const ticketPostHandler = async (event: LambdaEvent): LambdaResult => {
  console.log('POST /api/tickets called')

  const dataText = event.body || '{}'  // req.body
  console.log('POST /api/tickets: event.body=', dataText)
  const dataObject = JSON.parse(dataText)
  console.log('POST /api/tickets: Object=', dataObject)

  if (!checkKeys(ticketFields, dataObject)) {
    console.log('POST /api/tickets bad result, fields=', ticketFields, ' not in object=', dataObject)
    const result = responseToApiGwWithError(400, 'Bad Request (body), check server logs')
    console.log('POST /api/tickets result', result)
    return result
  }

  try {
    dataObject.gig_id = parseInt(dataObject.gig_id)
    dataObject.user_id = parseInt(dataObject.user_id)
    const postResponse = await postTicket(dataObject)
    const result = responseToApiGw(200, postResponse)
    console.log('POST /api/tickets result', result)
    return result
  } catch (error) {
    console.log('POST /api/tickets: error:', error)
    return responseToApiGwWithError(500, 'Error putting ticket, check server logs')
  }
}

export const bootstrapHandler = async () => {
  // the response of this lambda does not technically need to match
  // the structure api gw expects as we invoke it directly after a cdk-deploy
  console.log('bootstrap: lambda called')
  try {
    const resultCode = await bootstrap()
    if (resultCode === 201) {
      console.log('bootstrap: lambda done')
      return {
        statusCode: resultCode,
        success: 'Bootstrap done',
        time: timestampText(),
      }
    } else {
      console.error('bootstrap: error invoking scripts')
      return {
        status: 500,
        failure: 'Error running bootstrap scripts, see server logs',
        time: timestampText(),
      }
    }
  } catch (error: unknown) {
    console.error('bootstrap: error', error)
    return {
      status: error.code,
      time: timestampText(),
      failure: 'bootstrap: error',
      error
    }
  }
}
