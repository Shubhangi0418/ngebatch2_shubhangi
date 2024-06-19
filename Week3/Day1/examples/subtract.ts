export const subtract = (a: any, b: any) => {
  if(typeof a !== 'number') {
    throw new Error('first parameter is not a number')
  }

  if(typeof b !== 'number') {
    throw new Error('second parameter is not a number')
  }

  return a - b
}
