// Cursor Park (anyone not typing put your cursor here)

// Lets make a function that returns all names at once
// Sam Byron Mark Aisha Megan

const addNames = (...arr:String[])=> arr.join(" ");
const resultNames: any= addNames('Sam', 'Byron', 'Mark', 'Aisha', 'Megan')

console.log(`addNames = ${resultNames}`)
console.log('As an array = ', resultNames)
console.log('As a string = ', resultNames.toString())

// EOF
