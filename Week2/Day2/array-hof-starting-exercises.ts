// Cursor Park (anyone not typing put your cursor here)

const academitePets = ['Daisy', 'Oscar', 'Wiggins', 'Gatsby']

// Let's use forEach() to iterate the Academites and log the names
academitePets // academitePets.TODO
academitePets.forEach((academitePets) => {
 console.log(`Hello ${academitePets}`)
})

// Lets use map() to shout out "HELLO NAME" for each Academite
const shoutOut = academitePets.map((name)=>console.log(`HELLO ${name}`))
//console.log('Shout out is', shoutOut)

// Let's use filter to remove Daisy as she's been naughty today
const filtered = academitePets.filter((name)=> name!="Daisy")
console.log('Filtered names are', filtered)

// Here are some Academite ages (in months!)
const academitePetsWithAges = [
  // array of objects
  { name: 'Daisy', age: 8 }, // ages in months!
  { name: 'Oscar', age: 9 },
  { name: 'Wiggins', age: 44 },
  { name: 'Gatsby', age: 56 },
]

// Let's filter out all the young naughty dogs/academites!
// ...remove the ones younger than 12 months
const above12Months = academitePetsWithAges.filter((pets)=>pets.age<12)
console.log('Academites above 12 months:', above12Months)

// Now lets filter the older academites out and then shout out the NAME of each, all in one go
// ...we need some "method chaining", also called "functional composition"
const filteredAndShouted = academitePetsWithAges.filter((academites)=>academites.age>18)
console.log('Shout out to our young best friends ', filteredAndShouted)

/*
Filtering first means that the mapping only deals with items that remain after filtering.
Mapping first would have turned all of the names to upper case before filtering out the older dogs (so less efficient).
*/

// EOF
