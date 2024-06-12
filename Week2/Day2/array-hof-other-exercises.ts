// Cursor Park (anyone not typing put your cursor here)

const someAcademitesWithAges = [ // array of objects
  { name: 'Aisha', age: 8 }, // ages in months!
  { name: 'Oscar', age: 9 },
  { name: 'Wiggins', age: 44 },
  { name: 'Gatsby', age: 56 }
]

type Academite = {
  name: string, 
  age: number
}


// Reduce the array to only the total age in months of all the doggie Academites
// TODO

const totalAge = (total:any, someAcademitesWithAge:any) => total + someAcademitesWithAge.age
const startingage = 0
const sum = someAcademitesWithAges.reduce(totalAge, startingage)
console.log(someAcademitesWithAges)



// Sort the array by the names (alphabetically)
// Make a separate sorting function then use it
const sortByName = 'TODO'
// TODO
someAcademitesWithAges.sort() // Default ASC
const compareStrings = (name1:any, name2:any) => (name1.name < name2.name ? -1 : 0) // DESC
someAcademitesWithAges.sort(compareStrings) 
console.log(someAcademitesWithAges)

// Sort the array by the reverse ages (so, oldest first)
// Make a separate sorting function then use it
const sortByAges = 'TODO'
someAcademitesWithAges.sort((a, b) => b.age - a.age);


// EOF
