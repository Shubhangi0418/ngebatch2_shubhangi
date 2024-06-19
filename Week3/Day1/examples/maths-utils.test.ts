/*
Don't change this file - change the one in ./exercises instead!

Run this with
> npm install
> npm test maths-utils
*/

import { add } from './maths-utils'

describe('When calling the Add function', () => {

  let result : number
  beforeEach(()=>{
    result = add(10,20);
})     
  it('should add two integers', () => {
    // Arrange
    console.log('Setup variables here')

    // Act
    console.log('Call function here')

    // Assert
    console.log('Check results here')
    expect(result).toBe(30);
  })
})
