// Cursor Park (anyone not typing put your cursor here)
// Rewrite this function in Arrow form:
function sayHello(firstName, lastName) {
    console.log("sayHello: Hello ".concat(firstName, " ").concat(lastName));
}
sayHello("Neil", "Jennings");
// TODO make hiEveryone() as arrow function with sayHello functionality
hiEveryone("Neil", "Jennings");
// Rewrite this function in one-line arrow syntax:
var loadsOfMoneyFun = function (myWages) { return myWages * 10; };
function loadsOfMoney(myWages) {
    return myWages * 10;
}
// TODO make soMuchMoreMoney() as a one-line arrow expression with loadsOfMoney
var resultSum = soMuchMoreMoney(300);
console.log("resultSum: ".concat(resultSum));
