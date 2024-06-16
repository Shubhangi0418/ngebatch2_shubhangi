// InfiniPizza!

// Sample of having resolve and reject

// Create a function to use later
const myLoggerCallback = (data: any) => console.log('I was called back with:', data)

// Toggle this value to pretend the db call has succeeded or failed
const bakeAPizza = () => false

const orderFoodPromise = () =>
  new Promise((resolve, reject) => {
    // Do some task 
    const longTaskOk = bakeAPizza() 
    // which eventually calls either:
    if (longTaskOk) {
      // Call this if we are happy
      resolve('Done! Yummy!')
    } else {
      // Or, if something goes wrong:
      reject('Oops, burnt it')
    }
  })

console.log('Start now...')
// See what happens here when the above call fails (rejects)
orderFoodPromise().then(myLoggerCallback) 
console.log('...Done')

export {}
