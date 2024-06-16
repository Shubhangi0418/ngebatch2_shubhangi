// try/catch example with finally

const throwingFunction = async () => {
  throw new Error('This is an error')
}

const errorHandlingFunction = async () => {
  try {
    await throwingFunction() // We need the await keyword here, because an error thrown in an async function
    // is the same as returning a Promise.reject()
  } catch (error) {
    console.error(error)
  } finally { // This block will always be executed, regardless of whether an error is thrown or not, even
    // if the try or catch blocks contain a return statement.
    console.log('That\'s error handling, folks!')
  }
}

console.log('Start async now...')
errorHandlingFunction()
console.log('...async started')

// This example explicitly returns Promise.reject():

const rejectingFunction = async () => {
  return new Promise((resolve, reject) => {
    reject(new Error('This function rejects'))
  })
}

const tryCatchFunction = async () => {
  try {
    await rejectingFunction()
  } catch (error) {
    console.log('We handled that error too!', error)
  }
}

console.log('Start async now...')
tryCatchFunction()
console.log('...async started')

export {}
