/*
Run with
> npm install
> npm test palindrome
*/
import { palindrome } from './palindrome'

describe('When calling the palindrome function', () => {

  let result: boolean;

  beforeEach(()=>{
    result = palindrome('aba');
})

  it('will return true or false when called', () => {
   // Arrange 
   console.log("To setup the data ");         
   // Act 
      console.log("CAll the function ");
  // Assert 
   //   expect(result).toHaveBeenCalled()
  })

  it('will return false for invalid inputs', () => {
    // Arrange 
    console.log("To setup the data ");         
    // Act 
       console.log("CAll the function ");
   // Assert 
       expect(result).toBe(false);
    
  

  })

  it('will return true for text that is a palindrome', () => {
  
    // Arrange 
        console.log("To setup the data ");         
     // Act 
        console.log("CAll the function ");
    // Assert 
        expect(result).toBe(true);
  })
})
