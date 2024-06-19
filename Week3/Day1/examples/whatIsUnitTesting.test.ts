/**
 * What is Unit Testing?
 * 
 * A "unit" of code could be regarded as a couple of things
 * 
 * Most commonly it is taken to mean the smallest amount
 * of code you can execute independently of any other code.
 * 
 * It is often also taken to mean a piece of code that you can 
 * execute in its entirety.
 * 
 */

function add(a: any, b: any) {
  return a + b
}

/**
 * When you want to test a code under particular conditions, you often need to
 * 'arrange' particular things in order to apply that scenario to the 'unit' of
 * code that is under test.
 * 
 * By looking at the different ways you can interact with a piece of code you can
 * begin to think about the different things you might want to 'Arrange'.
 * 
 * Arrange: Given you have 'arranged' X, Y, Z
 * Act:     When you invoke the function with X, Y, Z
 * Assert:  Then you expect to see the code behave in some way
 * 
 * For this add function, there are only really 2 things we can do:
 * 1. Pass a parameter 'a'
 * 2. Pass a parameter 'b'
 * 
 * This means when we construct a scenario we want to test our code under, we will
 * be 'arranging' data to provide as input to params 'a', and 'b'.
 */

const firstParam = 10
const secondParam = 15

/**
 * We have successfully 'arranged' some data for our test, now we need to 'Act'!
 * This means taking the arranged data and actually using it with the code under test.
 * 
 * For most units of code, you will be able to 'invoke' the function/method
 * that you want to run. You can apply the same concept to other kinds of testing.
 * 
 * For example you could interact with, and invoke an API endpoint with some input.
 * 
 * For the 'add' function though, invoking the function is all we need to do:
 */

add(firstParam, secondParam)


/**
 * So we have arranged our test data, we have performed an 'act'. Now we need to
 * observe the results of our actions and assert against those observations.
 * 
 * Exactly what you assert against will be different for each unit of code, it
 * largely come down to the behaviours that you're expecting to see in each unit.
 * 
 * For this 'add' function we expect to see a couple of things:
 * 1. It returns a value
 * 2. The returned value is the sum of its inputs
 * 
 * In order to make this assertion, we will need to capture the outputs from
 * the unit, and then use jest to check them:
 */

test('when invoking add with 10 and 15 it should return 25', () => {
  const result = add(firstParam, secondParam)
  expect(result).toEqual(25)
})


/**
 * Even the most basic "units" of code can behave in weird and wonderful ways!
 * 
 * Take the Add function.
 * 
 * If you give it two numbers, it will do exactly what you might expect - Add them.
 * 
 * But what happens if you give it strings, arrays, or even a mix of data types?
 * 
 * Below is an array of "scenarios" that describes:
 * - two inputs to the add function
 * - The expected result of the add function
 * 
 * You can regard this as a means of 'Arranging' a variety of things in a way that
 * is easy to add to and modify.
 */

// ARRANGE!
const scenarios = [
  { a: 10, b: 5, expected: 15 },
  { a: -10, b: -5, expected: -15 },
  { a: '1', b: '2', expected: '12' },
  { a: 'a', b: 'dd', expected: 'add' },
  { a: [1, 2], b: [3, 4], expected: '1,23,4' },
]

/**
 * Using the array of scenarios defined above, we can quickly craft a test
 * that will test the add function in a variety of ways!
 * 
 * We can use normal javascript to iterate over the array of scenarios, and 
 * provide the pre-arranged "a", and "b" parameters to the function we want
 * to test.
 * 
 * You can also use built-in Jest functionality '.each' to repeatedly
 * perform a describe, or it block.
 * 
 * Below is an example of using '.forEach' to construct a clear and descriptive
 * scenario title.
 * 
 * Below that is an example of using the describe.each functionality of jest
 * to achieve the same thing.
 * 
 */
scenarios.forEach(({ a, b, expected }) => {
  describe(`When adding ${JSON.stringify(a)} and ${JSON.stringify(b)} together`, () => {
    let result: number

    beforeEach(() => {
      // ACT!
      result = add(a, b)
    })

    it(`should return ${expected}`, () => {
      // ASSERT!
      expect(result).toEqual(expected)
    })
  })
})

describe.each(scenarios)(`When invoking add with $a and $b`, ({ a, b, expected }) => {
  let result: number

  beforeEach(() => {
    // ACT!
    result = add(a, b)
  })

  it(`should return ${expected}`, () => {
    // ASSERT!
    expect(result).toEqual(expected)
  })
})
