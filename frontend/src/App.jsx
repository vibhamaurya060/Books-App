
import { Route, Router, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Login from './components/Auth/Register'

function App() {

  return (
    <>
       <Router>
        <Navbar/>
        <h2>Hello react</h2>
        <Routes>
          <Route path='/login' element={<Login/>}/>
        </Routes>
       </Router>

    </>
  )
}

export default App
