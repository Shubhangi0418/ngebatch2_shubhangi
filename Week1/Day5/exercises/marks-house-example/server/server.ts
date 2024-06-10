// Define the app
import express from 'express'
import cors from 'cors' // because security
const app = express()

app.use(cors()) // because security
app.use(express.json())

const PORT = 8080
app.listen(PORT, () => {
  console.log(`Express server listening on port: ${PORT}`)
})

const dataFromDb = {
  cats: 2,
  dogs: 1,
  teenagers: 3,
  mess: 'lots',
}

// GET http://localhost:8080/marks-house
app.get('/marks-house', (request, response) => {
  console.log('GET /marks-house called')
    
  // EXERCISE
  // Send back the db data
})

// POST http://localhost:8080/more-pets
// POST and PUT need data in the request.body
// Assume it looks like { petType: 'budgies', count: 3 }
app.post('/more-pets', (request, response) => {
  console.log('POST /more-pets called with', request.body)

  // EXERCISE
  // Take the pet type and pet count from the json body and put that into the db data
  // Send back an OK message

})
