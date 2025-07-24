import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { placeOrder,getAllOrders,getordersforadmin, delOrder} from "../controler/orderControler.js";


const orderRout = express.Router();

orderRout.post("/place", authMiddleware, placeOrder)
orderRout.get("/get", authMiddleware, getAllOrders)
orderRout.get("/getordersforadmin", getordersforadmin)
orderRout.get("/delorder", delOrder)

export default orderRout
