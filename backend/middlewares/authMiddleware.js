import jwt from "jsonwebtoken"



const authMiddleware = async (req, res, next)=>{
    const {token} = req.headers;
    // console.log("token is ", token)
    if (!token) {
        return res.json({success:false, message:"Not authorized"});
    }
    try {
        const token_decode = jwt.verify(token,process.env.JWT_SECRET_KEY);
        req.userId = token_decode.id;
        next();
    } catch (error) {
        console.log(error)
        res.json({success:false, message:"Error in authorization"})
    }
}



export default authMiddleware