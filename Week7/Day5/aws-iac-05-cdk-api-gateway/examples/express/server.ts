import express, { Request, Response, Router } from 'express'
import cors from 'cors'
import { gigPostHandler, gigsGetHandler, ticketPostHandler, ticketsGetHandler, userPostHandler, usersGetHandler } from './functions/aurora-lambdas'
import { healthcheckGetHandler } from './functions/utility-lambdas'

// API gateway
const app = express()
app.use(cors())

const apiRoutes = Router()

app.use('/api', apiRoutes)

app.listen(3000, () => {
  console.log('listening on port 3000')
})


// API gateway resources
apiRoutes.get('/healthcheck', healthcheckGetHandler)

apiRoutes.get('/gigs', gigsGetHandler)
apiRoutes.post('/gigs', gigPostHandler)

apiRoutes.get('/users', usersGetHandler)
apiRoutes.post('/users', userPostHandler)

apiRoutes.get('/tickets', ticketsGetHandler)
apiRoutes.post('/tickets', ticketPostHandler)
