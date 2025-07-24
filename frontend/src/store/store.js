import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice.js";
import foodReducer from "./slices/foodSlice.js"

const store = configureStore({
  reducer: {
    cart: cartReducer,
    food: foodReducer,
  },
});

export default store;
