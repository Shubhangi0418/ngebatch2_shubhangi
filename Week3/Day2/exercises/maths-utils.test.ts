/*
Run this with
> npm install
> npm test maths-utils
*/

import { add, safeMultiply } from './maths-utils'

describe('When calling the Add function', () => {
  let value: number
  // beforeEach(() =>{
  //   value = add(10,20)
  // })

  it('should add two integers', () => {
    // Arrange: Setup variables here

    // Act: Call function here
    value = add(10,20)

    // Assert: Check results here
    expect(value).toBe(30);
    console.log('Result '+value);

  })

  it('will add strings and numbers', () => {
    value = add('A',20)

    // Assert: Check results here
    expect(value).toBe('A20');
    console.log('Result '+value);
  })
})

describe('When calling the safeMultiply function', () => {

  it('should multiply two integers', () => {
    // Arrange: Setup variables here
    // Hint: happy case

    // Act: Call function here

    // Assert: Check results here

    let result= safeMultiply(10,5)
    // Assert: Check results here
    expect(result).toBe(50);
    console.log('Result '+result);

  })

  it('will throw an error when parameter a is bad', () => {
    let a: any = 'A', b: any = 5;
    const result = () => {
      safeMultiply(a, b);
    };
    // Assert: Check results here
    expect(result).toThrow(new Error(`Parameters a and b must be numeric but got a='${a}' and b='${b}'`));
    console.log('Result '+result);
  })
    
  it('will throw an error when parameter b is bad', () => {
    let b: any = 'A', a: any = 5;
    const result = () => {
      safeMultiply(a, b);
    };
    // Assert: Check results here
    expect(result).toThrow(new Error(`Parameters a and b must be numeric but got a='${a}' and b='${b}'`));
    console.log('Result '+result);
  })
})
