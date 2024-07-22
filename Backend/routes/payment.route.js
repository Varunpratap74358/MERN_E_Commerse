import exppress from 'express'
import { allOrder, checkout, userOrder, verify } from '../controllers/payment.controler.js'
import {Authenticated} from "../middleware/auth.js"

const router =  exppress.Router()

router.post('/checkout',checkout)
router.post("/verify-payment",verify)

router.get("/userorder",Authenticated, userOrder)
router.get("/allorder",allOrder)


export default router