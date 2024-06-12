// Cursor Park (anyone not typing put your cursor here)

// Make a function that says "Hello Academy folks: Alice Bob Charles Danielle"
// Use the rest operator (as per previous exercise), not fixed arguments, so not like this:
// function helloAcademy (person1, person2, person3, person4) {
//     console.log(`Hello Academy folks: ${person1} ${person2} ${person3} ${person4}`)
// }

// An array of academy folks
const academyFolks: string[] = ['Alice', 'Bob', 'Charles', 'Danielle']
const helloAcademy = (a:any)=>{
  console.log("Hello Academy folks:",...a);
}

helloAcademy(academyFolks);
// Call the function that says hello with an exploded array (spread it)
// TODO

// Add more academy folks into a new array in one line using the spread operator
// TODO
const academyFolks2: string[] = ['Alice', 'Bob', 'Charles', 'Danielle', 'Akshay','Kalpana','Thangaraj','Sagar']
// Say hello to all the academy folks using the spread operator
// TODO
helloAcademy(academyFolks2);
// EOF
