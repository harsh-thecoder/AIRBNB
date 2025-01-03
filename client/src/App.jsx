import './App.css'
import { Route, Routes } from 'react-router-dom'
import LoginPage from './Pages/LoginPage'
import Layout from './Components/Layout'
import IndexPage from './Pages/IndexPage'
import RegisterPage from './Pages/RegisterPage'
import { UserContextProvider,UserContext } from './Components/UserContext'
import AccountPage from './Pages/AccountPage'
import AccomodationPage from './Pages/AccomodationPage'
import AccomodationForumPage from './Pages/AccomodationForumPage'
import SingleAccommodationPage from './Pages/SingleAccommodationPage'

import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.withCredentials = true;

function App() {

  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/account/' element= {<AccountPage/>} />
          <Route path='/account/accommodations' element= {<AccomodationPage/>} />
          <Route path='/account/accommodations/new' element= {<AccomodationForumPage/>} />
          <Route path='/account/accommodations/:id' element= {<AccomodationForumPage/>} />
          <Route path='/accommodation/:id' element = {<SingleAccommodationPage/>}/>
        </Route>
      </Routes>
    </UserContextProvider>
  )
}

export default App


