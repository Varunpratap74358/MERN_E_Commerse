import React, { useContext, useState } from 'react'

import { useNavigate } from 'react-router-dom'
import ContextApp from '../Context/ContextApp'

const Address = () => {
  const { shipingAddress,userAddress } = useContext(ContextApp)
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    city: '',
    state: '',
    country: '',
    pincode: '',
    phoneNumber: '',
  })

  const onchangeHandler = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const {
    fullName,
    address,
    city,
    state,
    country,
    pincode,
    phoneNumber,
  } = formData

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    const result = await shipingAddress(
      fullName,
      address,
      city,
      state,
      country,
      pincode,
      phoneNumber,
    )

    // console.log("result",result)

    setFormData({
      fullName: '',
      address: '',
      city: '',
      state: '',
      country: '',
      pincode: '',
      phoneNumber: '',
    })

    if(result.success){
      navigate("/checkout")
    }
  }

  return (
    <>
      <div className='container' id="address">
        <form  className="container" onSubmit={onSubmitHandler}>
          <h1 className="text-center">Shiping Address</h1> <hr />
          <div className="row">
            <div className="form-group col-md-4">
              <label htmlFor="email">Full Name:</label>
              <input
                type="text"
                id="Name"
                name="fullName"
                value={formData.fullName}
                onChange={onchangeHandler}
                placeholder="Enter name"
                className="bg-dark text-light"
              />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="email">Countary:</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={onchangeHandler}
                placeholder="Enter email"
                className="bg-dark text-light"
              />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="password">State:</label>
              <input
                type="text"
                id="password"
                name="state"
                value={formData.state}
                onChange={onchangeHandler}
                placeholder="Your Password"
                className="bg-dark text-light"
              />
            </div>
          </div>
          <div className="row">
            <div className="form-group col-md-4">
              <label htmlFor="email">City:</label>
              <input
                type="text"
                id="Name"
                name="city"
                value={formData.city}
                onChange={onchangeHandler}
                placeholder="Enter name"
                className="bg-dark text-light"
              />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="email">Pincode:</label>
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={onchangeHandler}
                placeholder="Enter email"
                className="bg-dark text-light"
              />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="password">Phone Number:</label>
              <input
                type="text"
                id="password"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={onchangeHandler}
                placeholder="Your Password"
                className="bg-dark text-light"
              />
            </div>
          </div>
          <div className=" ">
            <label htmlFor="email">Address/Nearby:</label>
            <textarea
              type="text"
              id="texterea"
              name="address"
              value={formData.address}
              onChange={onchangeHandler}
              className="bg-dark text-light"
            />
          </div>
          <button className="regbtn" type="submit">
            Submit
          </button>
        </form>

        {userAddress && (
        <div className="d-grid container ">
          <button onClick={()=>navigate("/checkout")} className='btn btn-warning regbtn'>
              Use Old Address
          </button>
        </div>
        )}
      </div>
    </>
  )
}

export default Address
