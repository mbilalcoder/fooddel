import express from "express";
import multer from "multer";
import { addFood, foodList, delFood } from "../controler/foodControler.js";

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage });
const foodRout = express.Router();

foodRout.post("/add", upload.single("image"), addFood);
foodRout.post("/remove", delFood);
foodRout.get("/list", foodList);

export default foodRout;
