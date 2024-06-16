// InfiniPizza!

// We can make a chain of promises using Composition

// Create a function to use later
const myLoggerCallback = (data: any) => console.log('I was called back with:', data)

// function with a default value if not specified
const multiplyData = (result = 1): Promise<number> =>
  new Promise((resolve) => {
    setTimeout(() => resolve(result * 2), 500)
  })
const addData = (result = 1): Promise<number> =>
  new Promise((resolve) => {
    setTimeout(() => resolve(result + 2), 500)
  })

console.log('Start now...')

// Invoke with default value
multiplyData()
  .then(addData)
  .then(multiplyData)
  .then(addData)
  .then(myLoggerCallback) // = 10

console.log('...done')

export {}
