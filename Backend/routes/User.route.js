import express from "express";
import {login, profile, register , users} from "../controllers/user.controller.js"
import { Authenticated } from "../middleware/auth.js"

const route = express.Router()

route.post("/register",register)
route.post("/login",login)
route.get("/all",users)//get all users
route.get("/profile",Authenticated, profile)


export default route