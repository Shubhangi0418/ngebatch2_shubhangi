/*
Run this with
> npm install
> npm test zoo-animals
*/

import { addDolphinToPool, petThePenguins } from './zoo-animals'

describe('When adding a dolphin to the pool', () => {

  test('And speed is over 30 we get Speedy Alice', () => {
    // Arrange
        
    // Act 

    // Assert
    // Hint: expect.objectContaining on name only
  })

  test('And speed is under 30 we get Slow Bob', () => {
    // Arrange

    // Act 

    // Assert
    // Hint: expect.objectContaining on name only
  })

  test('Speedy Alice is a fast mammal with two flippers', () => {
    // Arrange

    // Act 

    // Assert
    // Hint: toStrictEqual the whole object
  })

  test('Slow Bob is a slow mammal with two flippers', () => {
    // Arrange

    // Act 

    // Assert
    // Hint: toStrictEqual the whole object
  })
})

describe('When petting the penguins', () => {

  test('One penguin with one fish will be fed', () => {
    // Arrange

    // Act 

    // Assert
    // Hint: toStrictEqual the whole array
  })

  test('One penguin with no fish will be hungry', () => {
    // Arrange

    // Act 

    // Assert
    // Hint: toStrictEqual the whole array
  })

  describe('And there are not enough fish', () => {

    test('At least one penguin will be hungry', () => {
      // Arrange

      // Act 

      // Assert
      // Hint: expect.arrayContaining on one penguin
    })
  })

})
