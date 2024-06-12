// Cursor Park (anyone not typing put your cursor here)
// Rewrite this function in Arrow form:
function sayHello(firstName, lastName) {
    console.log("sayHello: Hello ".concat(firstName, " ").concat(lastName));
}
sayHello('Neil', 'Jennings');
// TODO make hiEveryone() as arrow function with sayHello functionality
var hiEveryone = function (fName, lName) { return console.log("sayHello: Hello ".concat(fName, " ").concat(lName)); };
hiEveryone('Neil', 'Jennings');
// Rewrite this function in one-line arrow syntax:
function loadsOfMoney(myWages) {
    return myWages * 10;
}
// TODO make soMuchMoreMoney() as a one-line arrow expression with loadsOfMoney
var soMuchMoreMoney = function (myWages) { return myWages * 10; };
var resultSum = soMuchMoreMoney(300);
console.log("resultSum: ".concat(resultSum));
