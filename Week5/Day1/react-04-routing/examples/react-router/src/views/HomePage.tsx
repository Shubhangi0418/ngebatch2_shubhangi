import { useLocation } from 'react-router-dom'

const HomePage = () => {
  const { pathname } = useLocation()

  return <h2>This is the Home Page at path "{pathname}" {process.env.VITE_MY_NAME} </h2>
}

export default HomePage
