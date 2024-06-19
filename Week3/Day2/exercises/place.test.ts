/*
Run with
> npm install
> npm test place
*/
import { place } from './place'

describe('When calling the place function', () => {

  // Starting happy test - we will add more
  test('We can place a piece in a column', () => {

    // Arrange
    let board = [
      [null, null, null, null], 
      [null, null, null, null], 
      [null, null, null, null], 
      [null, null, null, null]
    ]
    const player = 'Mike'
    const column = 1

    const expectedOutput = [
      [null, null, null, null], 
      ['Mike', null, null, null], 
      [null, null, null, null], 
      [null, null, null, null]
    ]

    // Act
    const actualOutput = place(board, player, column)

    // Assert
    expect(actualOutput).toStrictEqual(expectedOutput)
  })
})
