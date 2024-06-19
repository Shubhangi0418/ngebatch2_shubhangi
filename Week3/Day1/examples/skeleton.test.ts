/*
Run this with
> npm install
> npm test skeleton
*/

// A single test

test('the thing being tested should do what you expect', () => {
  // Arrange
  console.log('Setup variables here')

  // Act
  console.log('Call function here')

  // Assert
  console.log('Check results here')
})

// We can use 'describe()', 'it()' and 'test()' all interchangeably and nested too

describe('When calling the XYZ function', () => {
  it('should do what you expect', () => {
    // Arrange
    console.log('Setup variables here')

    // Act
    console.log('Call function here')

    // Assert
    console.log('Check results here')
  })

  test('something else', () => {
    //Arrange
    //Act
    //Assert
  })
})
