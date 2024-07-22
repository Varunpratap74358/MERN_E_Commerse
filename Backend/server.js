import express from 'express'
import mongoose from 'mongoose'
import userRouter from './routes/User.route.js'
import productRouter from "./routes/product.route.js"
import cartRouter from "./routes/cart.route.js"
import addresRouter from './routes/address.js'
import cors from 'cors'
import paymentRouter from './routes/payment.route.js'

const app = express()
const port = 3000

app.use(express.json())

app.use(cors({
    origin:true,
    methods:[ "GET", "POST", "PUT", "DELETE" ],
    credentials:true
}))

app.use("/api/user",userRouter)
app.use("/api/product",productRouter)
app.use("/api/cart",cartRouter)
app.use("/api/address",addresRouter)
app.use("/api/payment",paymentRouter)



mongoose.connect("mongodb://localhost:27017/MERN_E_COMERSE").then(()=>{
    console.log("Mongo db Connected")
}).catch((err)=>{
    console.log("Error in mongo db connection : "+err)
})

app.listen(port,()=>{
    console.log(`Server is runing on port ${port}`)
})