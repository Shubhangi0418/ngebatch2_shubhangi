// InfiniPizza!
 
// Create a function to use later
const myLoggerCallback = (data: any) => console.log('I was called back with:', data)
 
const promiseMaker = (declaration: string) =>
  new Promise((resolve) => {
    //long running action like connect to db, get loads of data
 
    //then on success
    resolve(`I promised to: ${declaration} and I have`)
  })
 
const promise1 = promiseMaker('Order a pizza')
 
console.log('Start now...')
promise1.then(myLoggerCallback) // I promised to: Order a pizza and I have
console.log('...Done')
 
// Which can be thought of as:
// promise.then((argument) => console.log(argument))
 
export {}