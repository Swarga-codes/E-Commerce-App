import { useState } from 'react'
import './App.css'
import Home from './Components/Home/Home'
import { Route,Routes } from 'react-router-dom'
import Cart from './Components/Cart/Cart'
function App() {

  return (
    <>
    <Routes>
    <Route exact path='/' element={<Home/>}/>
    <Route exact path='/cart' element={<Cart/>}/>
</Routes>
    </>      
  )
}

export default App
