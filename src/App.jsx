import { useState } from 'react'
import './App.css'
import Home from './Components/Home/Home'
import { Route,Routes } from 'react-router-dom'
import Cart from './Components/Cart/Cart'
import Login from './Components/Login/Login'
function App() {

  return (
    <>
    <Routes>
    <Route exact path='/' element={<Home/>}/>
    <Route exact path='/cart' element={<Cart/>}/>
    <Route exact path='/login' element={<Login/>}/>
</Routes>
    </>      
  )
}

export default App
