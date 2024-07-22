import React, { useContext, useState } from 'react'
import './Register.css'
import ContextApp from '../../Context/ContextApp'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const { register } = useContext(ContextApp)
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })

  const onchangeHandler = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const { name, email, password } = formData

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    const result = await register(name, email, password)
    
    setFormData({ email: '', name: '', password: '' })

    
    if(result.success){
      navigate("/login")
    }

  }

  return (
    <>
      <div>
        <form className="form-container" onSubmit={onSubmitHandler}>
          <h1 className="text-center">User Register</h1> <hr />
          <div className="form-group">
            <label htmlFor="email">Name:</label>
            <input
              type="Name"
              id="Name"
              name="name"
              value={formData.name}
              onChange={onchangeHandler}
              placeholder="Enter name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={onchangeHandler}
              placeholder="Enter email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={onchangeHandler}
              placeholder="Your Password"
            />
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
    </>
  )
}

export default Register
