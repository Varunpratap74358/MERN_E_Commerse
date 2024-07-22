import React from 'react'
import ShowProduct from './Componante/Product/ShowProduct'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './Componante/Navbar'
import ProductDetail from './Componante/Product/ProductDetail'
import SearchProduct from './Componante/Product/SearchProduct'
import Register from './Componante/User/Register'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './Componante/User/Login'
import Profile from './Componante/User/Profile'
import Cart from "./Componante/Cart"
import Address from './Componante/Address'
import Checkout from './Componante/Checkout'
import OrderConformation from './Componante/OrderConformation'


const App = () => {
  return (
    <Router>
      <Navbar />
      <ToastContainer />
      <Routes>
        <Route path='/' element={<ShowProduct />} />
        <Route path='/product/:id' element={<ProductDetail />}/>
        <Route path='/product/search/:term' element={<SearchProduct />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/shipping' element={<Address />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/orderconfirmation' element={<OrderConformation />} />
      </Routes>
    </Router>
  )
}

export default App
