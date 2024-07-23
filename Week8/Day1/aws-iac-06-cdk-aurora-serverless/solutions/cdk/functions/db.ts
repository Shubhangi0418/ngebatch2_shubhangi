import {
  sql00_dropAllTables,
  sql01_createGigsTable,
  sql02_createUsersTable,
  sql03_createTicketsTable,
  sql04_populateGigsTable,
  sql05_populateUsersTable,
  sql06_populateTicketsTable,
} from './db-bootstrap-sqls'

import client from 'data-api-client'
const connection = client({
  secretArn: process.env.SECRET_ARN || 'NOT_SET',
  resourceArn: process.env.CLUSTER_ARN || 'NOT_SET',
  database: process.env.DB_NAME || 'NOT_SET',
})

const runSQL = async (connection: any, sql: string) => {
  console.log('runSQL: ', sql)
  await connection.query(sql)
}

export const bootstrap = async () => {
  console.log('bootstrap: called')
  try {
    await runSQL(connection, sql00_dropAllTables)
    await runSQL(connection, sql01_createGigsTable)
    await runSQL(connection, sql02_createUsersTable)
    await runSQL(connection, sql03_createTicketsTable)
    await runSQL(connection, sql04_populateGigsTable)
    await runSQL(connection, sql05_populateUsersTable)
    await runSQL(connection, sql06_populateTicketsTable)
    return 201
  } catch (error) {
    console.log('bootstrap: error:', error)
    return 500
  }
}

export const getGigs = async () => {
  try {
    console.log('getGigs called')
    const result = await connection.query('SELECT * FROM gigs ORDER BY id asc;')
    console.log('getGigs result: ', result.records)
    return result.records
  } catch (error) {
    console.log('getGigs: error:', error)
    throw error
  }
}

export const getUsers = async () => {
  try {
    console.log('getUsers called')
    const result = await connection.query('SELECT * FROM users ORDER BY id asc;')
    console.log('getUsers result: ', result.records)
    return result.records
  } catch (error) {
    console.log('getUsers: error:', error)
    throw error
  }
}

const ticketsJoinSql = `
  SELECT t.gig_id || '-' || t.user_id as composite_id, t.*, u.*, g.*
  FROM tickets t
  INNER JOIN users u
  ON t.user_id = u.id
  INNER JOIN gigs g
  ON t.gig_id = g.id ORDER BY composite_id asc;
  `

export const getTickets = async () => {
  try {
    console.log('getTickets called')
    const result = await connection.query(ticketsJoinSql)
    console.log('getTickets result: ', result.records)
    return result.records
  } catch (error) {
    console.log('getTickets: error:', error)
    throw error
  }
}

// NOTE: we should use a TIMESTAMP for date_time but have simplified this for this session
export const postGig = async (gigData: any) => {
  console.log('postGig called', gigData)
  const result = await connection.query(
    `INSERT INTO gigs (location, artist, date_time) VALUES (:location, :artist, :date_time) RETURNING *;`,
    { ...gigData }
  )
  console.log('postGig: result=', result.records)
  return result.records
}

export const postUser = async (userData: any) => {
  console.log('postUser called', userData)
  const result = await connection.query(
    `INSERT INTO users (user_name, user_address) VALUES (:user_name, :user_address) RETURNING *;`,
    { ...userData }
  )
  console.log('postUser: result=', result.records)
  return result.records
}

export const postTicket = async (ticketData: any) => {
  console.log('postTicket called', ticketData)
  const result = await connection.query(
    `INSERT INTO tickets (gig_id, user_id) VALUES (:gig_id, :user_id) RETURNING *;`,
    { ...ticketData }
  )
  console.log('postTicket: result=', result.records)
  return result.records
}

export const gigFields = [ 'location', 'artist', 'date_time' ]
export const userFields = [ 'user_name', 'user_address' ]
export const ticketFields = [ 'gig_id', 'user_id' ]
