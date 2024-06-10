// Define the app
import express from 'express'
import cors from 'cors' // because security
const app = express()

const PORT = 8080
app.listen(PORT, () => {
  console.log(`Express server listening on port: ${PORT}`)
})

// You need this for the POST example
app.use(express.json())

// Allows same-site origin - for use locally with following FETCH session
app.use(cors())

// Also used in Fetch session
app.get('/hello', (request, response) => {
  console.log('GET /hello called')
  response.send('world')
})

// Also used in Fetch session
app.get('/error', (request, response) => {
  console.log('GET /error called')
  response.status(400)
  response.json({ errorMessage: 'missing parameters' })
})

// Also used in Fetch session
app.get('/hello/:person/', (request, response) => {
  //Write some code that will return a message that includes the
  //persons name by getting it out of the request params
  console.log('Hi user $(person)')
  response.json({ errorMessage: 'missing parameters' })
})

// Also used in Fetch session
app.post('/profile', (request, response) => {
  console.log('POST /profile: request.body=', request.body)
  const greeting = `Hello ${request.body.person} you are ${request.body.age} year(s) old`
  response.send(greeting)
})
