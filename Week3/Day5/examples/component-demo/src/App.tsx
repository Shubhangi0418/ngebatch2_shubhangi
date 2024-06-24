import Greeting from './components/Greeting'

const App = () => {
  const firstName = 'Fiona'
  const isBirthday = true

  return <Greeting name={firstName} isBirthday={isBirthday} />
}

export default App
