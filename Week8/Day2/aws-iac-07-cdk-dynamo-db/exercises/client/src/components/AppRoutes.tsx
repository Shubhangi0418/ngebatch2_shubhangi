import { Route, Routes } from 'react-router-dom'
import HomePage from './HomePage'
import GigDataPage from './GigsDataPage'
import GigsDataPageById from './GigsDataPageById'
import NewGigDataPage from './NewGigDataPage'

const serverAddress = process.env.VITE_SERVER_ADDRESS || 'NOT_SET'

const AppRoutes = () => (
  <Routes>
    <Route path='/' element={<HomePage serverAddress={serverAddress} />} />
    <Route path='/gigdata' element={<GigDataPage serverAddress={serverAddress} />} />
    <Route path='/gigdatabyid' element={<GigsDataPageById serverAddress={serverAddress} />} />
    <Route path='/newgigdata' element={<NewGigDataPage serverAddress={serverAddress} />} />
  </Routes>
)

export default AppRoutes
