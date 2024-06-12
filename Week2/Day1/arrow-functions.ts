// Cursor Park (anyone not typing put your cursor here)

// Rewrite this function in Arrow form:

function sayHello(firstName: string, lastName: string) {
  console.log(`sayHello: Hello ${firstName} ${lastName}`);
}
sayHello("Neil", "Jennings");

// TODO make hiEveryone() as arrow function with sayHello functionality
let hiEveryone=(fName,lName)=>{
  console.log("Hi NeilJennings");
  
}
hiEveryone("Neil", "Jennings");

// Rewrite this function in one-line arrow syntax:
let loadsOfMoneyFun = (myWages) => myWages * 10;

function loadsOfMoney(myWages: number) {
  return myWages * 10;
}

// TODO make soMuchMoreMoney() as a one-line arrow expression with loadsOfMoney

const resultSum = soMuchMoreMoney(300);
console.log(`resultSum: ${resultSum}`);
