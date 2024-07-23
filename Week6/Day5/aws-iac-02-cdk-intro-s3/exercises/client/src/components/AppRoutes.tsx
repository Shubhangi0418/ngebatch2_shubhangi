import { Route, Routes } from 'react-router-dom'
import HomePage from './HomePage'
import GigsPage from './GigsPage'
import GigDataPage from './GigsDataPage'
import GigsDataPageById from './GigsDataPageById'
import NewGigDataPage from './NewGigDataPage'
import NewGigPage from './NewGigPage'
import UsersPage from './UsersPage'
import NewUserPage from './NewUserPage'
import TicketsPage from './TicketsPage'
import NewTicketPage from './NewTicketPage'

const serverAddress = process.env.VITE_SERVER_ADDRESS || 'NOT_SET'

const AppRoutes = () => (
  <Routes>
    <Route path='/' element={<HomePage serverAddress={serverAddress} />} />
  </Routes>
)

export default AppRoutes
