import express from "express"
import {addToCart, removeFromCart, getCart} from "../controler/cartControler.js"
import authMiddleware from "../middlewares/authMiddleware.js"

const cartRout = express.Router()


cartRout.post("/add",authMiddleware, addToCart)
cartRout.post("/remove",authMiddleware, removeFromCart)
cartRout.get("/get",authMiddleware, getCart)

export default cartRout