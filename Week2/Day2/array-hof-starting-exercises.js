// Cursor Park (anyone not typing put your cursor here)
var academitePets = ['Daisy', 'Oscar', 'Wiggins', 'Gatsby'];
// Let's use forEach() to iterate the Academites and log the names
academitePets; // academitePets.TODO
academitePets.forEach(function (academitePets) {
    console.log("Hello ".concat(name));
});
// Lets use map() to shout out "HELLO NAME" for each Academite
var shoutOut = academitePets.map(function (name) { return console.log("HELLO ".concat(name)); });
//console.log('Shout out is', shoutOut)
// Let's use filter to remove Daisy as she's been naughty today
var filtered = academitePets.filter(function (name) { return name != "Daisy"; });
console.log('Filtered names are', filtered);
// Here are some Academite ages (in months!)
var academitePetsWithAges = [
    // array of objects
    { name: 'Daisy', age: 8 }, // ages in months!
    { name: 'Oscar', age: 9 },
    { name: 'Wiggins', age: 44 },
    { name: 'Gatsby', age: 56 },
];
// Let's filter out all the young naughty dogs/academites!
// ...remove the ones younger than 12 months
var above12Months = 'TODO';
console.log('Academites above 12 months:', above12Months);
// Now lets filter the older academites out and then shout out the NAME of each, all in one go
// ...we need some "method chaining", also called "functional composition"
var filteredAndShouted = 'TODO';
console.log('Shout out to our young best friends ', filteredAndShouted);
/*
Filtering first means that the mapping only deals with items that remain after filtering.
Mapping first would have turned all of the names to upper case before filtering out the older dogs (so less efficient).
*/
// EOF
