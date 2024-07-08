import './App.css'
import { BrowserRouter } from 'react-router-dom'
import NavBar from './components/NavBar'
import AppRoutes from './components/AppRoutes'

const App = () => {
  return (
    <BrowserRouter>
      <div className='app'>
        <NavBar />
        <AppRoutes />
      </div>
    </BrowserRouter>
  )
}

export default App
