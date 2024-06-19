/*
Run this with
> npm install
> npm test maths-utils
*/

import { add, safeMultiply } from './maths-utils'

describe('When calling the Add function', () => {
  it('should add two integers', () => {
    // Arrange: Setup variables here

    // Act: Call function here

    // Assert: Check results here

  })

  it('will add strings and numbers', () => {
    // Arrange: Setup variables here

    // Act: Call function here

    // Assert: Check results here
  })
})

describe('When calling the safeMultiply function', () => {

  it('should multiply two integers', () => {
    // Arrange: Setup variables here
    // Hint: happy case

    // Act: Call function here

    // Assert: Check results here

  })

  it('will throw an error when parameter a is bad', () => {
    // Arrange: Setup variables here

    // Act: Call function here + Assert: Check results here
    // Hint: add a wrapper function
        
    // Assert
    // Hint: use "toThrow()"
  })
    
  it('will throw an error when parameter b is bad', () => {
    // Arrange: Setup variables here
        
    // Act: Call function here
        
    // Assert: Check results here
    // You can either do this with a wrapper function and .toThrow, or you can try using a try/catch block
  })
})
