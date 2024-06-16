// async/await example

// This defines a promise like we saw before
// Even when using async/await there is usually a "full fat" promise at the start
const waitOne = (): Promise<number> =>
  new Promise((resolve) => {
    setTimeout(() => resolve(1), 1000)
  })

const waitTwo = (number: number): Promise<number> =>
  new Promise((resolve) => {
    setTimeout(() => resolve(number + 1), 2000)
  })

const waitThree = (number: number): Promise<number> =>
  new Promise((resolve) => {
    setTimeout(() => resolve(number + 2), 3000)
  })


// The "async" keyword wraps the following code in a Promise:
const waitThreeAsync = async (): Promise<number> => {
  const a = await waitOne() // The await keyword blocks until the promise resolves
  const b = await waitTwo(a) // So we can use the result of the first function call as an argument to the next one
  const c = await waitThree(b)
  return a + b + c
}
// waitThreeAsync as a function is asynchronous - but has synchronous calls within it

// (A) To invoke any Promise code we need to either be in an "async" block
// (The "async" keyword wraps the following code in a Promise)
const begin = async () => {
  console.log(await waitThreeAsync())
}

console.log('Start async now...')
begin()
console.log('...async started')

// (B) Or we need to use the promise chain
// So this still works
// (Usually we don't mix n match though!)
console.log('Start promise now...')
waitThreeAsync().then(console.log) // 3
console.log('...promise started')

export {}
