/*
===========================
Creating Promises
===========================
*/

// When you make a new promise you will need to implicitly or explicitly return it
// Here the code has an *implicit* return
const happyPromise = () =>
  new Promise((resolve) => {
    resolve(':-)') // Resolve a result
  })

// When you make a new promise you will need to implicitly or explicitly return it
// Here the code has an *implicit* return
const sadPromise = () =>
  new Promise((resolve, reject) => {
    reject(new Error(':-(')) // Reject with an Error
  })

// When you make a new promise you will need to implicitly or explicitly return it
// Here the code has an *implicit* return
const promiseToIncrement = (i = 0): Promise<number> =>
  new Promise((resolve) => {
    resolve(i + 1)
  })

/*
===========================
Consuming Promises
===========================
*/

happyPromise().then((result) => {
  console.log(result) // :-)
})

sadPromise().catch((error) => {
  console.error(error) // :-(
})

// Sequential Promises [Callback Hell] === "Icky"
promiseToIncrement(0).then((a) => {
  promiseToIncrement(a).then((b) => {
    promiseToIncrement(b).then((c) => {
      console.log(c) // 3
    })
  })
})

// Sequential Promises [Composition] === "Far Better"
promiseToIncrement(0)
  .then((a) => {
    return promiseToIncrement(a)
  })
  .then((b) => {
    return promiseToIncrement(b)
  })
  .then((c) => {
    console.log(c) // 3
  })

// Sequential Promises [Composition Shorthand] === "Pro!"
promiseToIncrement(0)
  .then(promiseToIncrement)
  .then(promiseToIncrement)
  .then(console.log) // 3

// Wrapping Sequential Promises inside their own promise
const three = () =>
  new Promise((resolve) => {
    promiseToIncrement(0)
      .then(promiseToIncrement)
      .then(promiseToIncrement)
      .then(resolve)
  })

three().then(console.log) // 3

/*
===========================
Concurrent Promises
===========================
*/

const tasks = [
  promiseToIncrement(1),
  promiseToIncrement(10),
  promiseToIncrement(20),
  promiseToIncrement(3),
]

Promise.all(tasks).then(console.log)

/*
===========================
Consuming Promises [Async/Await]
===========================
*/

const asyncTasks = async () => {
  const result = await happyPromise()
  return result
}

asyncTasks().then(console.log) // :-)

const four = async () => {
  const a = await promiseToIncrement(0)
  const b = await promiseToIncrement(a)
  const c = await promiseToIncrement(b)
  const d = await promiseToIncrement(c)
  return d
}

four().then(console.log) // 4;

/*
===========================
Error Handling [try/catch]
===========================
*/

try {
  const data = await sadPromise()
  console.log(data)
} catch (error) {
  console.log('Oops, something went wrong:', error)
}

export {}
