import './App.css'
import Navbar from './Components/Navbar'
import {Route,Routes} from 'react-router-dom'
import LoginPage from './Pages/LoginPage'
import Layout from './Components/Layout'
import IndexPage from './Pages/IndexPage'
import RegisterPage from './Pages/RegisterPage'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:4000';

function App() {

  return (
    <div>
       <Routes>
         <Route path='/' element = {<Layout/>}>
         <Route index element = {<IndexPage/>} /> 
         <Route path = '/login' element = {<LoginPage/>} />
         <Route path = '/register' element = {<RegisterPage/>} />
        </Route>
       </Routes>
    </div>
  )
}

export default App


