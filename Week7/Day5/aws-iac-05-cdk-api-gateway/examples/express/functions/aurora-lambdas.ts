import { Request, Response } from 'express'
import {
  checkKeys,
  timestampText,
} from './common'

const gigFields = [ 'location', 'artist', 'date_time' ]
const userFields = [ 'user_name', 'user_address' ]
const ticketFields = [ 'gig_id', 'user_id' ]

// API methods that calls the DB methods

export const gigsGetHandler = async (req: Request, res: Response) => {
  console.log('GET /api/gigs: called')

  try {
    const rows = [
      { id: 1, location: 'Leeds Variety Hall', artist: 'Duran Duran', date_time: '2022-11-21 19:30:00' },
      { id: 2, location: 'London Astoria', artist: 'The Cure', date_time: '2022-12-23 20:00:00' },
    ]
    return res.status(200).json(rows)
  } catch (error) {
    console.log('GET /api/gigs: error:', error)
    return res.status(500).send('Error getting gigs, check server logs')
  }
}

export const usersGetHandler = async (req: Request, res: Response) => {
  console.log('GET /api/users: called')
  try {
    const rows = [
      { id: 1, user_name: 'Alice', user_address: 'Leeds' },
      { id: 1, user_name: 'Bob', user_address: 'Manchester' },
    ]
    return res.status(200).json(rows)
  } catch (error) {
    console.log('GET /api/users: error:', error)
    return res.status(500).send('Error getting users, check server logs')
  }
}

export const ticketsGetHandler = async (req: Request, res: Response) => {
  console.log('GET /api/tickets: called')
  try {
    const rows = [
      { gig_id: 1, user_id: 1 },
      { gig_id: 2, user_id: 2 },
    ]
    return res.status(200).json(rows)
  } catch (error) {
    console.log('GET /api/tickets: error:', error)
    return res.status(500).send('Error getting tickets, check server logs')
  }
}

export const gigPostHandler = async (req: Request, res: Response) => {
  console.log('POST /api/gigs called')

  const dataText = req.body || '{}' // req.body
  console.log('POST /api/gigs: event.body=', dataText)
  const dataObject = JSON.parse(dataText)
  console.log('POST /api/gigs: Object=', dataObject)

  if (!checkKeys(gigFields, dataObject)) {
    console.log('POST /api/gigs bad result, fields=', gigFields, ' not in object=', dataObject)
    const result = res.status(400).send('Bad Request (body), check server logs')
    console.log('POST /api/gigs result', result)
    return result
  }

  try {
    const postResponse = { 'status': 'ok', time: timestampText() } // pretend we saved to a database here
    const result = res.status(200).json(postResponse)
    console.log('POST /api/gigs result', result)
    return result
  } catch (error) {
    console.log('POST /api/gigs: error:', error)
    return res.status(500).send('Error putting gig, check server logs')
  }
}

export const userPostHandler = async (req: Request, res: Response) => {
  console.log('POST /api/users called')

  const dataText = req.body || '{}' // req.body
  console.log('POST /api/users: event.body=', dataText)
  const dataObject = JSON.parse(dataText)
  console.log('POST /api/users: Object=', dataObject)

  if (!checkKeys(userFields, dataObject)) {
    console.log('POST /api/users bad result, fields=', userFields, ' not in object=', dataObject)
    const result = res.status(400).send('Bad Request (body), check server logs')
    console.log('POST /api/users result', result)
    return result
  }

  try {
    const postResponse = { 'status': 'ok', time: timestampText() } // pretend we saved to a database here
    const result = res.status(200).json(postResponse)
    console.log('POST /api/users result', result)
    return result
  } catch (error) {
    console.log('POST /api/users: error:', error)
    return res.status(500).send('Error putting user, check server logs')
  }
}

export const ticketPostHandler = async (req: Request, res: Response) => {
  console.log('POST /api/tickets called')

  const dataText = req.body || '{}'  // req.body
  console.log('POST /api/tickets: event.body=', dataText)
  const dataObject = JSON.parse(dataText)
  console.log('POST /api/tickets: Object=', dataObject)

  if (!checkKeys(ticketFields, dataObject)) {
    console.log('POST /api/tickets bad result, fields=', ticketFields, ' not in object=', dataObject)
    const result = res.status(400).send('Bad Request (body), check server logs')
    console.log('POST /api/tickets result', result)
    return result
  }

  try {
    dataObject.gig_id = parseInt(dataObject.gig_id)
    dataObject.user_id = parseInt(dataObject.user_id)
    const postResponse = { 'status': 'ok', time: timestampText() } // pretend we saved to a database here
    const result = res.status(200).json(postResponse)
    console.log('POST /api/tickets result', result)
    return result
  } catch (error) {
    console.log('POST /api/tickets: error:', error)
    return res.status(500).send('Error putting ticket, check server logs')
  }
}
