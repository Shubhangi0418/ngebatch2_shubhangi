const helloButton = document.getElementById('hello-button')
const errorButton = document.getElementById('error-button')
const paramButton = document.getElementById('param-button')
const postButton = document.getElementById('post-button')
const helloDiv = document.getElementById('hello-div')
const responseDisplay = document.getElementById('responseText')

const getHelloMessage = () => {

  fetch('http://localhost:8080/hello')
    .then(response => response.text())
    .then(data => {
      const greeting = document.createElement('p')
      greeting.innerText = `The server said: ${data}`
      helloDiv!.appendChild(greeting)
    })
    .catch(error => console.log('there was an error:', error))
}

const getErrorMessage = () => {
  fetch('http://localhost:8080/error')
    .then(response => {
      if (response.status >= 400) {
        throw new Error(`error status: ${response.status}`)
      }

      return response.text()
    })
    .then(data => responseDisplay!.innerText = data)
    .catch(error => {
      const errorMessage = `We have received an error and caught it: ---${error}---`
      console.log(errorMessage)
      responseDisplay!.innerText = errorMessage
    })
}

const getPersonalHelloMessage = () => {
  //Complete the fetch that sends a request for a personal message
  // fetch('http://localhost:8080/hello/YourName')
  fetch('http://localhost:8080/hello/name')
  .then(response => response.text())
  .then(data => {
    const greeting = document.createElement('p')
    greeting.innerText = `The server said: ${data}`
    helloDiv!.appendChild(greeting)
  })
  .catch(error => console.log('there was an error:', error))
}


const postProfileMessage = () => {
  fetch('http://localhost:8080/profile', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      person: 'Pudding',
      age: 3
    })
  })
    .then(response => {
      if (response.status >= 400) {
        throw new Error(`error status: ${response.status}`)
      }
      return response.text()
    })
    .then(data => responseDisplay!.innerText = data)
    .catch(error => console.log('there was an error:', error))
}

helloButton!.addEventListener('click', getHelloMessage)
errorButton!.addEventListener('click', getErrorMessage)
paramButton!.addEventListener('click', getPersonalHelloMessage)
postButton!.addEventListener('click', postProfileMessage)
