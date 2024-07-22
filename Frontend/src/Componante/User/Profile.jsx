import React, { useContext } from 'react'
import ContextApp from '../../Context/ContextApp'

const Profile = () => {
    const {user}=useContext(ContextApp)
  return (
    <>
      <div className="container text-center my-5">
            <h1>Welcome, {user?.name}</h1>
            <h3>Email: {user?.email}</h3>
      </div>
    </>
  )
}

export default Profile
