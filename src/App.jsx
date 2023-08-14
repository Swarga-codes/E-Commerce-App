import { useState } from 'react'
import './App.css'
import Home from './Components/Home/Home'
import { Route,Routes } from 'react-router-dom'
import Cart from './Components/Cart/Cart'
import UserLogin from './Components/UserLogin/UserLogin'
import UserSignup from './Components/UserRegsiter/UserSignUp'
import SellerLogin from './Components/SellerLogin/SellerLogin'
import SellerRegister from './Components/SellerRegister/SellerRegister'
function App() {

  return (
    <>
    <Routes>
    <Route exact path='/' element={<Home/>}/>
    <Route exact path='/cart' element={<Cart/>}/>
    <Route exact path='/users/login' element={<UserLogin/>}/>
    <Route exact path='/users/register' element={<UserSignup/>}/>
    <Route exact path='/seller/login' element={<SellerLogin/>}/>
    <Route exact path='/seller/register' element={<SellerRegister/>}/>
</Routes>
    </>      
  )
}

export default App
