// InfiniPizza!

// We can make a chain of promises using Composition

// function with a default value if not specified
const multiplyData = (result = 1): Promise<number> =>
  new Promise((resolve) => {
    setTimeout(() => {
      console.log(`multiplyData called with result=${result}`)
      resolve(result * 2)
    }, 500)
  })
const addData = (result = 1): Promise<number> =>
  new Promise((resolve) => {
    setTimeout(() => {
      console.log(`addData called with result=${result}`)
      resolve(result + 2)
    }, 500)
  })
const boomBox = (result = 1): Promise<any> =>
  new Promise((resolve) => {
    console.log(`boomBox called with result=${result}`)
    throw new Error('Database goes boom')
  })

const errorHandler = (someError: any) => {
  console.error('There was an error, please try again later...', someError)
}

const successHandler = (niceData: any) => {
  console.log('Success! The data is:', niceData)
}

console.log('Start now...')

// Invoke with default value
multiplyData()
  .then(addData)
  .then(boomBox) // move this line up and down and check the logs!
  .then(multiplyData)
  .then(addData)
  .then(successHandler)
  .catch(errorHandler)

console.log('...done')

export {}
