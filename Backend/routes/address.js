import express from'express'
import { addAddress, getAddress } from '../controllers/address.js'
import { Authenticated } from "../middleware/auth.js"

const router =  express.Router()

router.post("/add",Authenticated, addAddress)
router.get("/getaddress", Authenticated ,getAddress)


export default router 
