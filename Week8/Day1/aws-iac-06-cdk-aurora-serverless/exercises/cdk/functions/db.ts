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
  console.log("runSQL: ", sql);
  await connection.query(sql);
};
export const bootstrap = async () => {
  console.log('bootstrap: called')
  // TODO - run sql

  return 500
}

export const getGigs = async () => {
  console.log('getGigs called')

try {
    console.log('getGigs called')
    const result = await connection.query('SELECT * FROM gigs ORDER BY id asc;')
    console.log('getGigs result: ', result.records)
    return result.records
  } catch (error) {
    console.log('getGigs: error:', error)
    throw error
  }
 
  return []
}

export const getUsers = async () => {
  console.log('getUsers called')
  // TODO - run sql
  return []
}

export const getTickets = async () => {
  console.log('getTickets called')
  // TODO - run sql
  return []
}

export const postGig = async (gigData: any) => {
  console.log('postGig called', gigData)
  // TODO - run sql
  return []
}

export const postUser = async (userData: any) => {
  console.log('postUser called', userData)
  // TODO - run sql
  return []
}

export const postTicket = async (ticketData: any) => {
  console.log('postTicket called', ticketData)
  // TODO - run sql
  return []

}

export const gigFields = [ 'location', 'artist', 'date_time' ]
export const userFields = [ 'user_name', 'user_address' ]
export const ticketFields = [ 'gig_id', 'user_id' ]
