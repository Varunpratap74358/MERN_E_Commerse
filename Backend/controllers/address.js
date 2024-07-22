import { Address } from '../models/address.js'

export const addAddress = async (req, res) => {
  try {
    let {
      fullName,
      address,
      city,
      state,
      country,
      pincode,
      phoneNumber,
    } = req.body

    let userId = req.user

    let useraddress = await Address.create({
      userId,
      fullName,
      address,
      city,
      state,
      country,
      pincode,
      phoneNumber,
    })
    res.json({
      message: 'address added',
      success: true,
      useraddress,
    })
  } catch (error) {
    res.json({
      message: error.message,
    })
  }
}

export const getAddress = async (req, res) => {
  try {
    let address = await Address.findOne({ userId: req.user }).sort({
      createdAt: -1,
    })
    res.json({
      message: 'Address',
      address: address,
    })
  } catch (error) {
    res.json({
      message: error.message,
    })
  }
}
