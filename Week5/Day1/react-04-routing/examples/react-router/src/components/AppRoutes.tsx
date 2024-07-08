import { Route, Routes } from 'react-router-dom'
import HomePage from '../views/HomePage'
import PostPage from '../views/PostPage'
import AboutPage from '../views/AboutPage'

const AppRoutes = () => (
  <Routes>
    <Route path='/' element={<HomePage />} />
    <Route path='/about' element={<AboutPage />} />
    <Route path='/blog' element={<PostPage />} />
    <Route path='/blog/:id' element={<PostPage />} />
  </Routes>
)

export default AppRoutes
