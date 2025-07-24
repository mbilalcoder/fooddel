import orderModel from "../module/orderModel.js";
import userModel from "../module/userModel.js";

const placeOrder = async (req, res) => {
  try {
    const newOrder = new orderModel({
      userId: req.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });
    await newOrder.save();
    await userModel.findByIdAndUpdate(req.userId, { cartData: {} });
    res.json({ success: true, newOrder });
  } catch (error) {
    console.log(error);
    res.json({ success: true, message: "Order not placed successfully" });
  }
};

const getAllOrders = async (req, res) => {
  const userId = req.userId;
  try {
    const orderData = await orderModel.find({ userId: userId });
    res.json({ success: true, orderData });
  } catch (error) {
    console.log(error);
    res.json({ success: true, message: "error while loding the order data" });
  }
};

const getordersforadmin = async (req, res) => {
  try {
    const ordersData = await orderModel.find({});
    return res.json({ success: true, ordersData });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "you are not authorized" });
  }
};

const delOrder = async (req, res) => {
  const orderId = req.headers.orderid;
  
  try {
    const response = await orderModel.findByIdAndDelete(orderId);
    if (!response) {
      return res.json({ success: false, message: "Order not Deleted" });
    }
    return res.json({ success: true, message: "Order Deleted" });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Order not Deleted" });
  }
};

export { placeOrder, getAllOrders, getordersforadmin, delOrder };
