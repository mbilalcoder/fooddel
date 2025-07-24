import userModel from "../module/userModel.js"


const addToCart = async (req, res)=>{
    try {
        let userData = await userModel.findById({_id:req.userId});
        let cartData = await userData.cartData;
        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1
        }else{
            cartData[req.body.itemId] += 1
        }

        await userModel.findByIdAndUpdate(req.userId,{cartData});
        res.json({success:true, message:"Added to cart"})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:"Add to cart Error"})
        
    }
}

const removeFromCart = async (req, res)=>{
   try {
     const userData = await userModel.findById({_id:req.userId});
     const cartData = userData.cartData;
     const itemId = req.body.itemId;

     if (cartData[itemId]) {
        if (cartData[itemId] > 1) {
            cartData[itemId] -= 1
        }else{
            delete cartData[itemId]
        }
     }else{
        return res.json({success: false, message:"Item not found in the cart"})
     }
     await userModel.findByIdAndUpdate(req.userId, {cartData})
     res.json({success:true, message:"Item deleted from cart"})
   } catch (error) {
    console.log(error)
    return res.json({success:false, message:"Error while deleting the item"})
   }

}
const getCart = async (req, res)=>{
    try {
        const userData = await userModel.findById(req.userId)
        const cartData = userData.cartData
        res.json({success:true, cartData})
    } catch (error) {
        res.json({success:false, message:"Error white getting the cart"})
        
    }
}


export {addToCart, removeFromCart, getCart}