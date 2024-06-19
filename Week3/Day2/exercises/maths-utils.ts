// Cursor Park

// For examples of running this see maths-utils.test.js

export function add(a: any, b: any) {
  return a + b
}

export function safeMultiply(a: any, b: any) {
  if (isNaN(a) || isNaN(b)) {
    throw new Error(`Parameters a and b must be numeric but got a='${a}' and b='${b}'`)
  }
  return a * b
}

// EOF
