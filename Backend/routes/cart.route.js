import express from 'express'
import { addToCart, clearCart, decreaseProductQty, removeProductFromCart, userCart } from '../controllers/cart.controler.js'
import {Authenticated} from "../middleware/auth.js"

const router = express.Router()

router.post("/add", Authenticated ,addToCart)
router.get("/user",Authenticated,userCart)//get user spacific cart
router.delete("/remove/:productId",Authenticated,removeProductFromCart)
router.delete("/clear",Authenticated,clearCart)
router.post("/--qty",Authenticated,decreaseProductQty)


export default router