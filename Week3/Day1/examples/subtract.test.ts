/*
Run with
> npm install
> npm test subtract
*/
import { subtract } from './subtract'

/**
 * Bonus Exercise 001: Refactor the following scenarios to be parameterised using 'describe.each'
 * 
 * Often you will write scenarios one at time, only realising later that you could perhaps
 * have tackled different scenarios in one fell swoop. Refactoring your tests is just
 * as valuable as refactoring your code. it can improve the maintainability, and clarity
 * of what the expected behaviour of your code should be.
 * 
 * You should end up with a single scenario that lets you easily test
 * different combinations of numbers
 * 
 * Feel free to add to your array of scenarios!
 * What happens if you use things that aren't numbers? (please don't look down below 😉)
 * 
 * Pro Tip: 
 * running `npm test ./subtract.test.js -- --watch` will allow you to
 * automatically re-run the test any time the test file is changed. You can
 * get really fast feedback this way!
 */

describe('when subtract is invoked with 10 and 5', () => {
  let result: number

  beforeEach(() => {
    result = subtract(10, 5)
  })

  it('should return a result of 5', () => {
    expect(result).toEqual(5)
  })
})

describe('when subtract is invoked with 5 and 10', () => {
  let result: number

  beforeEach(() => {
    result = subtract(5, 10)
  })

  it('should return a result of -5', () => {
    expect(result).toEqual(-5)
  })
})

describe('when subtract is invoked with 10 and 0', () => {
  let result: number

  beforeEach(() => {
    result = subtract(10, 0)
  })

  it('should return a result of 0', () => {
    expect(result).toEqual(10)
  })
})

/**
 * Bonus Exercise 002: Get 100% test coverage for the subtract function!
 * 
 * Test coverage is a useful indicator of bits of your code that is missing tests.
 * The aim of the game is to have at least 100% unit test coverage.
 * 
 * When unit testing, you have the benefit of being able to look at the implementation
 * of the code to see what different branches of logic exist. You might want to inspect
 * the implementation of subtract.js!
 * 
 * if you run `npm run coverage subtract.test.js` there should be no uncovered lines!
 * This exercise requires you to work out which aspects of 'subtract' have not been
 * tested, and to then write a test to cover it 😃
 * 
 * i.e. the output of that command will go from:
 * -------------|---------|----------|---------|---------|-------------------
 * File         | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
 * -------------|---------|----------|---------|---------|-------------------
 * All files    |   85.71 |       75 |     100 |   85.71 |                   
 *  subtract.js |   85.71 |       75 |     100 |   85.71 | 7                 
 * -------------|---------|----------|---------|---------|-------------------
 * 
 * to:
 * -------------|---------|----------|---------|---------|-------------------
 * File         | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
 * -------------|---------|----------|---------|---------|-------------------
 * All files    |     100 |      100 |     100 |     100 |                   
 *  subtract.js |     100 |      100 |     100 |     100 |                   
 * -------------|---------|----------|---------|---------|-------------------
 * 
 * Hint: Below is a scenario that tests when the first parameter is not a number. 
 */

const nonNumericInputs = [
  'not-a-number',
  { foo: 'bar' },
  Symbol(),
  [1, 2, 3, 4],
]
describe.each(nonNumericInputs)('when invoking subtract with a non-numeric first parameter of %p', (input) => {
  let errorResult: unknown

  beforeEach(() => {
    try {
      subtract(input, 10)
    } catch (err) {
      errorResult = err
    }
  })

  it('should throw an error', () => {
    expect(errorResult).toEqual(new Error('first parameter is not a number'))
  })
})
