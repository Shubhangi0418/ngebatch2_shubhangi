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

  const rows = [
    { id: 1, location: 'Leeds Variety Hall', artist: 'Duran Duran', date_time: '2022-11-21 19:30:00' },
    { id: 2, location: 'London Astoria', artist: 'The Cure', date_time: '2022-12-23 20:00:00' },
  ]
  return {
    'statusCode': 200,
    'headers': {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    'isBase64Encoded': false,
    'body': JSON.stringify(rows),
  }
}

export const usersGetHandler = async (): LambdaResult => {
  console.log('GET /api/users: called')
  const rows = [
    { id: 1, user_name: 'Alice', user_address: 'Leeds' },
    { id: 1, user_name: 'Bob', user_address: 'Manchester' },
  ]
  return {
    'statusCode': 200,
    'headers': {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    'isBase64Encoded': false,
    'body': JSON.stringify(rows),
  }
}

export const ticketsGetHandler = async (): LambdaResult => {
  console.log('GET /api/tickets: called')
  const rows = [
    { gig_id: 1, user_id: 1 },
    { gig_id: 2, user_id: 2 },
  ]
  return {
    'statusCode': 200,
    'headers': {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    'isBase64Encoded': false,
    'body': JSON.stringify(rows),
  }
}

export const gigPostHandler = async (event: LambdaEvent): LambdaResult => {
  console.log('POST /api/gigs called')

  const dataText = event.body || '{}' // req.body
  console.log('POST /api/gigs: event.body=', dataText)
  const dataObject = JSON.parse(dataText)
  console.log('POST /api/gigs: Object=', dataObject)

  const postResponse = { 'status': 'ok', time: timestampText() } // pretend we saved to a database here
  return {
    'statusCode': 200,
    'headers': {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    'isBase64Encoded': false,
    'body': JSON.stringify(postResponse),
  }
}

export const userPostHandler = async (event: LambdaEvent): LambdaResult => {
  console.log('POST /api/users called')

  const dataText = event.body || '{}' // req.body
  console.log('POST /api/users: event.body=', dataText)
  const dataObject = JSON.parse(dataText)
  console.log('POST /api/users: Object=', dataObject)

  const postResponse = { 'status': 'ok', time: timestampText() } // pretend we saved to a database here
  return {
    'statusCode': 200,
    'headers': {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    'isBase64Encoded': false,
    'body': JSON.stringify(postResponse),
  }
}

export const ticketPostHandler = async (event: LambdaEvent): LambdaResult => {
  console.log('POST /api/tickets called')

  const dataText = event.body || '{}'  // req.body
  console.log('POST /api/tickets: event.body=', dataText)
  const dataObject = JSON.parse(dataText)
  console.log('POST /api/tickets: Object=', dataObject)

  dataObject.gig_id = parseInt(dataObject.gig_id)
  dataObject.user_id = parseInt(dataObject.user_id)
 
  const postResponse = { 'status': 'ok', time: timestampText() } // pretend we saved to a database here
  return {
    'statusCode': 200,
    'headers': {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    'isBase64Encoded': false,
    'body': JSON.stringify(postResponse),
  }
}
