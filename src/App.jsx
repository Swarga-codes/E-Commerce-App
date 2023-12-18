import './App.css'
import Home from './Components/Home/Home'
import { Route,Routes } from 'react-router-dom'
import Cart from './Components/Cart/Cart'
import UserLogin from './Components/UserLogin/UserLogin'
import UserSignup from './Components/UserRegsiter/UserSignUp'
import SellerLogin from './Components/SellerLogin/SellerLogin'
import SellerRegister from './Components/SellerRegister/SellerRegister'
import SellerDashboard from './Components/SellerDashboard/SellerDashboard'
import CreateProducts from './Components/CreateProducts/CreateProducts'
import MyProducts from './Components/MyProducts/MyProducts'
import UserProfile from './Components/UserProfile/UserProfile'
import CheckoutPage from './Components/CheckoutPage/CheckoutPage'
import OrderPlaced from './Components/OrderPlaced/OrderPlaced'
import MyOrders from './Components/MyOrders/MyOrders'
import { Toaster } from 'react-hot-toast'
import SellerProfile from './Components/SellerProfile/SellerProfile'
import SellerAnalytics from './Components/SellerAnalytics/SellerAnalytics'
import ProductDetails from './Components/ProductDetails/ProductDetails'
function App() {

  return (
    <>
    <div><Toaster/></div>
    <Routes>
    <Route exact path='/' element={<Home/>}/>
    <Route exact path='/cart' element={<Cart/>}/>
    <Route exact path='/users/login' element={<UserLogin/>}/>
    <Route exact path='/users/register' element={<UserSignup/>}/>
    <Route exact path='/seller/login' element={<SellerLogin/>}/>
    <Route exact path='/seller/profile' element={<SellerProfile/>}/>
    <Route exact path='/seller/register' element={<SellerRegister/>}/>
    <Route exact path='/seller/dashboard' element={<SellerDashboard/>}/>
    <Route exact path='/seller/analytics' element={<SellerAnalytics/>}/>
    <Route exact path='/seller/products/create' element={<CreateProducts/>}/>
    <Route exact path='/seller/myproducts' element={<MyProducts/>}/>
    <Route exact path='/product/details/:productID' element={<ProductDetails/>}/>
    <Route exact path='/user/profile' element={<UserProfile/>}/>
    <Route exact path='/cart/checkout' element={<CheckoutPage/>}/>
    <Route exact path='/cart/checkout/orderplaced' element={<OrderPlaced/>}/>
    <Route exact path='/users/myorders' element={<MyOrders/>}/>
</Routes>
    </>      
  )
}

export default App
