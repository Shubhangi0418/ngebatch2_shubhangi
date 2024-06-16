// InfiniPizza!

// We can make a chain of promises using Composition

// Create a function to use later
const myLoggerCallback = (data: any) => console.log('I was called back with:', data)

// function with a default value if not specified
const fetchData = (result = 1): Promise<number> =>
  new Promise((resolve) => {
    setTimeout(() => resolve(result * 2), 1000)
  })


console.log('Start now...')

// Invoke with default value
fetchData()
  .then(fetchData)
  .then(fetchData)
  .then(myLoggerCallback) // = 3

console.log('...done')

export {}
