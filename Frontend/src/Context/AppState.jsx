import React, { useEffect, useState } from 'react'
import ContextApp from './ContextApp'
import axios from 'axios'
import { Bounce, ToastContainer, Zoom, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const AppState = (props) => {
  const url = 'http://localhost:3000/api'
  const [products, setProducts] = useState([])
  const [token, setToken] = useState([])
  const [isAuthonticated, setIsAuthonticated] = useState(false)
  const [filterData, setFilterdata] = useState([])
  const [user, setUser] = useState()
  const [cart, setCart] = useState([])
  const [reload, setReload] = useState(false)
  const [userAddress,setUserAddress]=useState("")
  const [userOrder,setUserOrder]=useState([])


  //featch products
  useEffect(() => {
    const fetchProduct = async () => {
      const api = await axios.get(`${url}/product/all`, {
        headers: {
          'Content-Type': 'Application/json',
        },
        withCredentials: true,
      })
      // console.log(api.data.product)
      setProducts(api.data.product)
      setFilterdata(api.data.product)
      userprofile()
    }
    
    getAddress()
    fetchProduct()
    userCart()
    user_Order()
  }, [token, reload])

  // get Token
  useEffect(() => {
    let lsToken = localStorage.getItem('token')
    if (lsToken) {
      setToken(lsToken)
      setIsAuthonticated(true)
    }
  }, [])

  // Register User
  const register = async (name, email, password) => {
    const api = await axios.post(
      `${url}/user/register`,
      { name, email, password },
      {
        headers: {
          'Content-Type': 'Application/json',
        },
        withCredentials: true,
      },
    )
    toast.success(api.data.message, {
      position: 'top-right',
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
      transition: Bounce,
    })
    return api.data
  }

  // login
  const login = async (email, password) => {
    const api = await axios.post(
      `${url}/user/login`,
      { email, password },
      {
        headers: {
          'Content-Type': 'Application/json',
        },
        withCredentials: true,
      },
    )
    toast.success(api.data.message, {
      position: 'top-right',
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
      transition: Bounce,
    })

    setToken(api.data.token)
    setIsAuthonticated(true)

    localStorage.setItem('token', api.data.token)
    return api.data
  }

  //logout
  const logout = () => {
    setIsAuthonticated(false)
    setToken(' ')
    localStorage.removeItem('token')
    toast.success(api.data.message, {
      position: 'top-right',
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
      transition: Bounce,
    })
  }

  //user profile
  const userprofile = async () => {
    const api = await axios.get(`${url}/user/profile`, {
      headers: {
        'Content-Type': 'Application/json',
        Auth: token,
      },
      withCredentials: true,
    })
    // console.log(api.data.user)
    setUser(api.data.user)
  }

  // add to cart
  const addToCart = async (productId, title, price, qty, imgSrc) => {
    const api = await axios.post(
      `${url}/cart/add`,
      { productId, title, price, qty, imgSrc },
      {
        headers: {
          'Content-Type': 'Application/json',
          Auth: token,
        },
        withCredentials: true,
      },
    )
    
    // console.log(api.data)
    toast.success(api.data.message, {
      position: 'top-right',
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
      transition: Bounce,
    })
    setReload(!reload)
  }

  //  user cart cart
  const userCart = async () => {
    const api = await axios.get(`${url}/cart/user`, {
      headers: {
        'Content-Type': 'Application/json',
        Auth: token,
      },
      withCredentials: true,
    })
    // console.log(api.data.cart)
    setCart(api.data.cart)
  }

  // remove qty
  const decriseQty = async (productId, qty) => {
    const api = await axios.post(
      `${url}/cart/--qty`,
      { productId, qty },
      {
        headers: {
          'Content-Type': 'Application/json',
          Auth: token,
        },
        withCredentials: true,
      },
    )
    // console.log(api.data.cart)
    // setCart(api.data.cart)
    setReload(!reload)
    toast.warn('Item Incriserd', {
      position: 'top-right',
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
      transition: Zoom,
    })
  }

  // remove cart
  const removeFromCart = async (productId) => {
    const api = await axios.delete(`${url}/cart/remove/${productId}`, {
      headers: {
        'Content-Type': 'Application/json',
        Auth: token,
      },
      withCredentials: true,
    })
    setReload(!reload)
    toast.warn(api.data.message, {
      position: 'top-right',
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
      transition: Zoom,
    })
  }

  // clear cart
  const crearCart = async () => {
    const api = await axios.delete(`${url}/cart/clear`, {
      headers: {
        'Content-Type': 'Application/json',
        Auth: token,
      },
      withCredentials: true,
    })
    setReload(!reload)
    toast.warn(api.data.message, {
      position: 'top-right',
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
      transition: Zoom,
    })
  }

  //add shiping address
  const shipingAddress = async (
    fullName,
    address,
    city,
    state,
    country,
    pincode,
    phoneNumber,
  ) => {
    const api = await axios.post(
      `${url}/address/add`,
      { fullName, address, city, state, country, pincode, phoneNumber },
      {
        headers: {
          'Content-Type': 'Application/json',
          Auth: token,
        },
        withCredentials: true,
      },
    )
    setReload(!reload)
    toast.warn(api.data.message, {
      position: 'top-right',
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
      transition: Zoom,
    })
    return api.data
  }

  // get user latest address
  const getAddress = async () => {
    const api = await axios.get(`${url}/address/getaddress`, {
      headers: {
        'Content-Type': 'Application/json',
        "Auth":token
      },
      withCredentials: true,
    })
    // console.log( "ser addrtess" ,api.data)
    setUserAddress(api.data.address)
  }

  // user order
  const user_Order = async () => {
    const api = await axios.get(`${url}/payment/userorder`, {
      headers: {
        'Content-Type': 'Application/json',
        "Auth":token
      },
      withCredentials: true,
    })
    // console.log( "uiser order" ,api.data.orderses)
    setUserOrder(api.data.orderses)
    
  }

  return (
    <ContextApp.Provider
      value={{
        products,
        login,
        register,
        url,
        token,
        isAuthonticated,
        setIsAuthonticated,
        filterData,
        setFilterdata,
        logout,
        user,
        addToCart,
        cart,
        decriseQty,
        removeFromCart,
        crearCart,
        shipingAddress,
        userAddress,
        userOrder
      }}
    >
      {props.children}
    </ContextApp.Provider>
  )
}

export default AppState
