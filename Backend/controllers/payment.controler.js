import { Payment } from '../models/payment.model.js'
import Razorpay from 'razorpay'

const razorpay = new Razorpay({
  key_id: 'rzp_test_cxiK7G8pT6lf6J',
  key_secret: '1U5bJ6JYqzYypQ44MMe74a6I',
})


// checkout

export const checkout = async (req, res) => {
  const { amount, cartItems, userShipping, userId } = req.body

  var options = {
    amount: amount * 100, // amount in the smallest currency unit
    currency: 'INR',
    receipt: `recipt_${Date.now()}`,
  }

  const order = await razorpay.orders.create(options)

  res.json({
    orderId: order.id,
    amount,
    cartItems,
    userShipping,
    userId,
    payStatus: 'created',
  })
}


// verify and save to data base
export const verify = async (req, res) => {
  const {
    orderId,
    PaymentId,
    signature,
    amount,
    ordrItems,
    userId,
    userShipping,
  } = req.body

  let orderConfirm = await Payment.create({
    orderId,
    PaymentId,
    signature,
    amount,
    ordrItems,
    userId,
    userShipping,
    payStatus: 'paid',
  })
  // console.log(orderConfirm)
  res.json({ message: 'Payment Successfull...', success: true, orderConfirm })
}


// user spacific order

export const userOrder=async(req,res)=>{
 try {
  let userId = req.user._id.toString()
  // console.log(userId)
  let orderses = await Payment.find({userId}).sort({
    orderDate: -1})
    // let savedata = orderses.save()
    res.json({success:true,orderses})
 } catch (error) {
    res.json({message:error.message})
 }
}

// all order
export const allOrder=async(req,res)=>{
  try {
    
   let orderses = await Payment.find().sort({
     orderDate: -1})
     // let savedata = orderses.save()
     res.json({success:true,orderses})
  } catch (error) {
     res.json({message:error.message})
  }
 }