import './App.css'
import { Route, Routes } from 'react-router-dom'
import LoginPage from './Pages/LoginPage'
import Layout from './Components/Layout'
import IndexPage from './Pages/IndexPage'
import RegisterPage from './Pages/RegisterPage'
import UserContextProvider from './Components/UserContext'

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
        </Route>
      </Routes>
    </UserContextProvider>
  )
}

export default App


