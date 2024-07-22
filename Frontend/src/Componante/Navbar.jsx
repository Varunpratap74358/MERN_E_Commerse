import React, { useContext, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { BsSearchHeartFill } from 'react-icons/bs'
import ContextApp from '../Context/ContextApp'
import { FaCartArrowDown } from 'react-icons/fa'
import { FaUserAstronaut } from 'react-icons/fa'
import { IoIosLogOut } from 'react-icons/io'
import { FaCashRegister } from 'react-icons/fa'
import { RiLoginCircleFill } from 'react-icons/ri'

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()
  const location = useLocation()

  const { setFilterdata, products, logout, isAuthonticated, cart } = useContext(
    ContextApp,
  )

  const filterByCategory = (cat) => {
    if (Array.isArray(cat)) {
      setFilterdata(cat)
    } else {
      setFilterdata(
        products.filter(
          (data) => data.category.toLowerCase() === cat.toLowerCase(),
        ),
      )
    }
  }

  const filterByPrice = (price) => {
    setFilterdata(products.filter((data) => data.price >= price))
  }

  const submitHandler = (e) => {
    e.preventDefault()
    navigate(`/product/search/${searchTerm}`)
    setSearchTerm('')
  }

  return (
    <>
      <div className="nav sticky-top">
        <div className="nav_bar">
          <Link to={'/'} className="left">
            <h3>MERN E-Comerse</h3>
          </Link>
          <form onSubmit={submitHandler} className="search_bar">
            <BsSearchHeartFill className="serarchIcon" />
            <input
              type="text"
              placeholder="Search Product"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form>
          <div className="right">
            {isAuthonticated && (
              <>
                <Link
                  to={'/cart'}
                  className="btn btn-warning mx-3 position-relative"
                >
                  <FaCartArrowDown />
                  {cart?.items?.length > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {cart?.items?.length}
                    </span>
                  )}
                  {/* cart */}
                </Link>
                <Link to={'/profile'} className="btn btn-primary mx-3">
                  <FaUserAstronaut />
                  {/* user */}
                </Link>{' '}
                <button
                  onClick={() => {
                    navigate('/login')
                    logout()
                  }}
                  className=""
                  id="logout"
                >
                  Logout <IoIosLogOut />
                </button>
              </>
            )}

            {!isAuthonticated && (
              <>
                <Link to={'/login'} className="btn btn-secondary mx-3">
                  Login <RiLoginCircleFill />
                </Link>
                <Link to={'/register'} className="btn btn-info mx-3">
                  Register <FaCashRegister />
                </Link>
              </>
            )}
          </div>
        </div>

        {location.pathname == '/' && (
          <div className="sub_bar">
            <div className="items" onClick={() => filterByCategory(products)}>
              No Filter
            </div>
            <div className="items" onClick={() => filterByCategory('mobile')}>
              Mobiles
            </div>
            <div className="items" onClick={() => filterByCategory('laptop')}>
              Laptop
            </div>
            <div className="items" onClick={() => filterByCategory('camera')}>
              Cameras
            </div>
            <div
              className="items"
              onClick={() => filterByCategory('headphones')}
            >
              HeadPhones
            </div>
            <div className="items" onClick={() => filterByPrice(1999)}>
              1999
            </div>
            <div className="items" onClick={() => filterByPrice(60000)}>
              60000
            </div>
            <div className="items" onClick={() => filterByPrice(90000)}>
              90000
            </div>
            <div className="items" onClick={() => filterByPrice(200000)}>
              200000
            </div>
            <div className="items" onClick={() => filterByPrice(250000)}>
              250000
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Navbar
