import React, { useContext, useState } from 'react'
import './Register.css'
import ContextApp from '../../Context/ContextApp'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const { login } = useContext(ContextApp)
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const onchangeHandler = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const {  email, password } = formData

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    const result = await login( email, password)
    
    setFormData({ email: '', password: '' })

    
    if(result.success){
      navigate("/")
    }

  }

  return (
    <>
      <div>
        <form className="form-container" onSubmit={onSubmitHandler}>
          <h1 className="text-center">User Login</h1> <hr />
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
          <button type="submit">Login</button>
        </form>
      </div>
    </>
  )
}

export default Login
