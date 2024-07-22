import { User } from '../models/user.model.js'
import bcrypt from 'bcryptjs/dist/bcrypt.js'
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user)
      return res.json({ message: "User Already exist ", success: false });
    const hashPass = await bcrypt.hash(password, 10);
    user = await User.create({ name, email, password: hashPass });
    res.json({
      message: "User register successfully...! ",
      user,
      success: true,
    });
  } catch (error) {
    res.json({ message: error.message });
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body
    let user = await User.findOne({ email })
    if (!user) {
      return res.json({ message: 'user not found', success: false })
    }

    const validPassword = await bcrypt.compare(password, user.password)

    if (!validPassword) {
      return res
        .json({ message: 'Invalid email or password', success: false })
    }

    const token = jwt.sign({ userId: user._id }, '54$^&^%%67455%$##%$', {
      expiresIn: '365d',
    })

    res.json({ message: `welcome ${user.name}`, token, success: true })
  } catch (error) {
    res.json({ message: error.message })
  }
}

export const users = async (req, res) => {
  try {
    let users = await User.find().sort({ createdAt: -1 })
    if (!users) {
      return res
        .json({ message: 'Users Not Found', success: false })
    }
    res.json({ users, success: true })
  } catch (error) {
    res.json({ message: error.message })
  }
}

export const profile = async (req, res) => {
  res.json({ user: req.user })
}