// InfiniPizza!

type PizzaData = {
  name: string, 
  cost: number,
  size: string
}

// Create a function to use later
const successHandler = (pizzaData: PizzaData) => {
  console.log('I was called back with:', pizzaData)
  //complex processing
  console.log('name:', pizzaData.name)
  console.log('cost: £', pizzaData.cost)
  console.log('size:', pizzaData.size)
}

const fetchData = (pizzaName: string) => {
  return {
    name: pizzaName,
    cost: 12.34,
    size: '12"'
  }
}

const fetchDbPizzaDetails = (pizzaName: string): Promise<PizzaData> =>
  new Promise((resolve, reject) => {
    //long running action like connect to db, get loads of data
    const databaseData: PizzaData = fetchData(pizzaName) // for example
    resolve(databaseData)
  })

console.log('Start now...')

// Promise to do some code
fetchDbPizzaDetails('Margherita').then(successHandler)

console.log('...Done')

export {}
