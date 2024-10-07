import './App.css'
import Navbar from './Components/Navbar'
import {Route,Routes} from 'react-router-dom'

function App() {

  return (
    <div>
       <Routes>
         <Route index element = {<Navbar/>} />
       </Routes>
    </div>
  )
}

export default App
