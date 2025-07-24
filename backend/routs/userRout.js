import experss from "express"
import { loginUser, registerUser } from "../controler/userControler.js"


const userRouter = experss.Router()


userRouter.post("/register",registerUser)
userRouter.post("/login",loginUser)


export default userRouter