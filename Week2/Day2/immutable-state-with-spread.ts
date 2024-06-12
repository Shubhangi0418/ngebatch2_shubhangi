// Cursor Park (anyone not typing put your cursor here)


type User = {
  surname: string,
  age?: number
}

type SomeUsers = {
  [key: string]: User
}

// An Academy object with several users
const academyUsers: SomeUsers = {
  shaw: {
    surname: 'Malcolm',
  },
  valentine: {
    surname: 'Bott',
  },
}

// Create a function that adds an 'age' property of 21 to each user
// without mutating the original users
// and without mutating the original user objects either

const ageUpdater = (originalUsers: SomeUsers) => {
  // TODO: Your code goes here
}

// Call the Age Updater function
const updatedUsers = ageUpdater(academyUsers)

// Log the original Academy Users object
// ... we want this to be { shaw: { surname: 'Malcolm' }, valentine: { surname: 'Bott' } }
// console.log(`Original Academy: ${academyUsers}`) just prints "[object Object]"
console.log('Original Academy:', academyUsers)

// Log the extended Academy object with ages
// ...we want this to be { shaw: { surname: 'Malcolm', age: 21 }, valentine: { surname: 'Bott', age: 21 } }
// console.log(`Updated Academy: ${updatedUsers}`) just prints "[object Object]"
console.log('Updated Academy:', updatedUsers)

// EOF this code at the end is for teaching purposes, it allows us to redeclare types with the same name
export {}
