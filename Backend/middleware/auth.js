import jwt from 'jsonwebtoken'
import { User } from '../models/user.model.js'

export const Authenticated = async (req, res, next) => {
  try {
    const token = req.header('Auth')

    if (!token) {
      return res.json({
        message: 'Login first',
        success: false,
      })
    }

    const decoded = jwt.verify(token, '54$^&^%%67455%$##%$')

    const id = decoded.userId

    let user = await User.findById(id)
    if(!user){
        return res.json({message:"User not exist"})
    }
    req.user = user
    next()

  } catch (error) {
    res.json({
      error: error,
    })
  }
}
