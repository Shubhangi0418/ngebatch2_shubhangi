// Functional Programming - Workshop Exercise 4.
//
// Read the whole file!
// Then start at the instructions after the "EXERCISES" header
//
// Run the file with "npx ts-node exercise-4.ts" and read the outputs (console.logs) before you make any changes

type User = {
  name: string, 
  food: number | null
}

type Food = {
  name: string, 
  id: number | null
}

const userData: User[] = [
  {
    name: 'John',
    food: 1
  },
  {
    name: 'Bob',
    food: 2
  },
  {
    name: 'Sarah',
    food: 3
  },
  {
    name: 'Faye',
    food: 4
  },
  // Uncomment this to test your try/catch
  {
    name: 'Tim',
    food: null
  }
]

const foodData: Food[] = [
  {
    name: 'Pizza',
    id: 1
  },
  {
    name: 'Indian',
    id: 2
  },
  {
    name: 'Thai',
    id: 3
  },
  {
    name: 'American',
    id: 4
  }
]

const queryUser = (personName: string): Promise<User> =>
  new Promise((resolve, reject) => {
    if (!personName) {
      reject(new Error('Missing Name'))
    }

    const result = userData.filter((user) => user.name === personName)[ 0 ] || null

    if (!result.name) {
      reject(new Error('Not Found!'))
    } else {
      resolve(result)
    }
  })

const queryFood = (foodId: number | null): Promise<Food> =>
  new Promise((resolve, reject) => {
    if (!foodId) {
      reject(new Error('Missing ID'))
    }

    const result = foodData.filter((food) => food.id === foodId)[ 0 ] || null

    if (!result.name) {
      reject(new Error('Not Found!'))
    } else {
      resolve(result)
    }
  })

// Part 1. Refactor this to use async/await. 
// Part 2. Refactor this to use a try/catch block to handle errors.
const findFavouriteFood = (name: string) =>
  new Promise((resolve, reject) => {
    queryUser(name)
      .then((person) => queryFood(person.food))
      .then((foodItem) => resolve(`${name} likes ${foodItem.name}`))
      .catch((err) => reject(err))
  })

console.log('User data:', userData)
console.log('Food data:', foodData)

console.log('')
console.log('Bad Results:')
// Uncomment these one at a time to test that your refactor works:
//
// findFavouriteFood('') //Test rejection for not providing a name
// findFavouriteFood('Megan') //Test rejection for giving a name that isn't in database
// findFavouriteFood('Tim') //Test rejection for missing food id


// ----- EXERCISES -------------------------------------------------------

// Part 1. Refactor findFavouriteFood to use async/await. 
// Part 2. Refactor findFavouriteFood to use a try/catch block to handle errors.
