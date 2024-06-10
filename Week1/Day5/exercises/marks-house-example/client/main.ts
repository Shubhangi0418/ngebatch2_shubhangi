//code here

// get the button
const fetchButton = document.getElementById('fetch-data-button')
const postButton = document.getElementById('post-data-button')
const petTypeInput = document.getElementById('pet-type')
const petCountInput = document.getElementById('pet-count')
const dataHolderDiv = document.getElementById('data-holder')

// button event handler for GET
const fetchHandler = () => {
  const serverUrl = 'http://localhost:8080/marks-house'
  console.log('Fetching data from...', serverUrl)

  // EXERCISE
  // Put a fetch() promise chain in here
}

// button event handler for POST
// POST (and PUT) need data in the request.body
// From the server the data we must send looks like { petType: 'budgies', count: 3 }
const postHandler = () => {
  const serverUrl = 'http://localhost:8080/more-pets'
  console.log('Posting data to...', serverUrl)
  const petTypeText = (petTypeInput as HTMLInputElement).value
  const petCountText = (petCountInput as HTMLInputElement).value
  const dataToSend =  { petType: petTypeText, count: petCountText }

  // EXERCISE
  // Put a fetch() promise chain in here
  // You need to configure the POST method, application/json content type, and a send a stringified body
  // "Be inspired" by the solution if you need it.
}

// attach code to the button
fetchButton!.addEventListener('click', fetchHandler)
postButton!.addEventListener('click', postHandler)
