import express from "express";
import cors from "cors";
import foodRout from "./routs/foodRout.js";
import userRouter from "./routs/userRout.js";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import cartRout from "./routs/cartRout.js";
import orderRout from "./routs/orderRout.js";

dotenv.config();

const port = process.env.PORT;
const app = express();

connectDb();

app.use(cors());
app.use(express.json());

app.use("/api/food", foodRout);
app.use("/images", express.static("uploads"));
app.use("/api/user",userRouter);
app.use("/api/cart",cartRout);
app.use("/api/order",orderRout)

app.get("/", (req, res) => {
  res.send("You are at home page");
});

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
