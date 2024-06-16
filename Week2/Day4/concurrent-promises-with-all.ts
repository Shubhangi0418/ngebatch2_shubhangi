// InfiniPizza!

const waitOne = () =>
  new Promise((resolve) => {
    setTimeout(() => resolve(1), 1000)
  })

const waitTwo = () =>
  new Promise((resolve) => {
    setTimeout(() => resolve(2), 2000)
  })

// An array of Promises
const tasks = [waitOne(), waitTwo(), waitOne()]

const successReport = (someData: any) => {
  console.log('Success all finished!', someData)
}

console.log('Start now...')
Promise.all(tasks).then(successReport) // [1,2,1] an array of all the Resolved values
console.log('...Done')

export {}
