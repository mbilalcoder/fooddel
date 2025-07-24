import foodModel from "../module/foodModule.js";
import fs from "fs";

const addFood = async (req, res) => {
  const img_name = req.file.filename;

  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    category: req.body.category,
    image: img_name,
    price: req.body.price,
  });

  try {
    await food.save();
    res.json({ success: true, message: "food Saved" });
  } catch (error) {
    res.json({ success: false, message: "Error food not Saved" });
  }
};

const foodList = async (req, res) => {
  try {
    const foodData = await foodModel.find({});
    res.json({ success: true, data: foodData });
  } catch (error) {
    res.json({ success: false, data: "Error" });
  }
};

const delFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);
    fs.unlink(`uploads/${food.image}`, () => {});
    await foodModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Food removed" });
  } catch (error) {
    res.json({
      success: false,
      message: "There is an error",
    });
  }
};

export { addFood, foodList, delFood };
