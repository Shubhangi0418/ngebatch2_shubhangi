// InfiniPizza!

const waitOne = () =>
  new Promise((resolve) => {
    setTimeout(() => resolve(1), 500)
  })

const waitTwo = () =>
  new Promise((resolve) => {
    setTimeout(() => resolve(2), 1000)
  })

const boomBox = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`boomBox called`)
      //throw new Error('Database goes boom')
      reject('Database says no')
    }, 750)
  })

// An array of Promises
const tasks = [waitOne(), waitTwo(), waitOne(), boomBox()]

const successReport = (someData: any) => {
  console.log('Success all finished!', someData)
}

const errorHandler = (someError: any) => {
  console.error('There was an error, please try again later...', someError)
}

console.log('Start now...')
Promise.all(tasks)
  .then(successReport) // [1,2,1] an array of all the Resolved values
  .catch(errorHandler)
console.log('...Done')

export {}
