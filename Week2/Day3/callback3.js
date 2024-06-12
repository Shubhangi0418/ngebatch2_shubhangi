"use strict";
// InfiniPizza!
Object.defineProperty(exports, "__esModule", { value: true });
// Create a function to use later
var myLoggerCallback = function (data) { return console.log('I was called back with:', data); };
var promiseMaker = function (declaration) {
    return new Promise(function (resolve) {
        //long running action like connect to db, get loads of data
        //then on success
        resolve("I promised to: ".concat(declaration, " and I have"));
    });
};
var promise1 = promiseMaker('Order a pizza');
console.log('Start now...');
promise1.then(myLoggerCallback); // I promised to: Order a pizza and I have
console.log('...Done');
