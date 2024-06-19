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
    let result= addDolphinToPool(31);
    expect(result).toEqual(expect.objectContaining({name: 'Speedy Alice'}));
  })

  test('And speed is under 30 we get Slow Bob', () => {
    // Arrange

    // Act 

    // Assert
    // Hint: expect.objectContaining on name only
    let result= addDolphinToPool(29);
    expect(result).toEqual(expect.objectContaining({name: 'Slow Bob'}));
  })

  test('Speedy Alice is a fast mammal with two flippers', () => {
    // Arrange

    // Act 

    // Assert
    // Hint: toStrictEqual the whole object
    let expectedResult={
      name: 'Speedy Alice',
      swimSpeedKph: 31,
      flippers: 2,
      mammal: true
    }
    let result= addDolphinToPool(31);
    expect(result).toStrictEqual(expectedResult);
  })

  test('Slow Bob is a slow mammal with two flippers', () => {
    // Arrange

    // Act 

    // Assert
    // Hint: toStrictEqual the whole object
    let expectedResult={
      name: 'Slow Bob',
      swimSpeedKph: 28,
      flippers: 2,
      mammal: true
    }
    let result= addDolphinToPool(28);
    expect(result).toStrictEqual(expectedResult);
  })
})

describe('When petting the penguins', () => {

  test('One penguin with one fish will be fed', () => {
    // Arrange

    // Act 

    // Assert
    // Hint: toStrictEqual the whole array
    let expectedResult=[{
      name: 'A',
      hungry: false,
      flippers: 2,
      mammal: false
    }]
    let result= petThePenguins(1, 1);
    expect(result).toStrictEqual(expectedResult);
  })

  test('One penguin with no fish will be hungry', () => {
    // Arrange

    // Act 

    // Assert
    // Hint: toStrictEqual the whole array
    let expectedResult=[{
      name: 'A',
      hungry: true,
      flippers: 2,
      mammal: false
    }]
    let result= petThePenguins(1, 0);
    expect(result).toStrictEqual(expectedResult);
  })

  describe('And there are not enough fish', () => {

    test('At least one penguin will be hungry', () => {
      // Arrange

      // Act 

      // Assert
      // Hint: expect.arrayContaining on one penguin
      let expectedResult=[{
        name: 'B',
        hungry: true,
        flippers: 2,
        mammal: false
      }]
      let result= petThePenguins(2, 1);
      expect(result).toStrictEqual(expect.arrayContaining(expectedResult));
    })
  })

})
