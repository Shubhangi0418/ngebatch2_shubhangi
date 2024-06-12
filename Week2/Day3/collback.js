"use strict";
// InfiniPizza!
Object.defineProperty(exports, "__esModule", { value: true });
// Create a function to use later
var myLoggerCallback = function () { return console.log('I was called back'); };
// Set up some code to do a long running bit of work
var asyncTask = function () {
    return new Promise(function (resolve) {
        setTimeout(resolve, 2000); // Simulate Delay
    });
};
// Start some long running non-blocking code now
// Don't wait for it to finish though
asyncTask().then(myLoggerCallback);
// Carry on...
console.log('Waiting...');
