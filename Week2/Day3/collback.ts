// InfiniPizza!
 
// Create a function to use later
const myLoggerCallback = () => console.log('I was called back')
 
// Set up some code to do a long running bit of work
const asyncTask = () =>
  new Promise((resolve) => {
    setTimeout(resolve, 2000) // Simulate Delay
  })
 
 
// Start some long running non-blocking code now
// Don't wait for it to finish though
asyncTask().then(myLoggerCallback)
 
// Carry on...
console.log('Waiting...')
 
export {}