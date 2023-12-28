import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import AddToBlog from './pages/AddToBlog'
import Navbar from './components/Navbar'
const App = () => {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/blog' element={<AddToBlog/>}/>
      </Routes>
    </div>
  )
}

export default App
