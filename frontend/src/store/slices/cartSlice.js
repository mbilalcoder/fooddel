import { createSlice } from "@reduxjs/toolkit";
import { food_list } from "../../assets/frontend_assets/assets";



const initialState = {
  food_list: food_list,
  cartItem: {},
  cartTotal: 0,
  deliveryFee: 0,
  token: localStorage.getItem("token") || ""
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const itemId = action.payload;
      if (!state.cartItem[itemId]) {
        state.cartItem[itemId] = 1;
      } else {
        state.cartItem[itemId] += 1; 
      }

      console.log(state.cartItem)
    },
    removeFromCart(state, action) {
      const itemId = action.payload;
      if (state.cartItem[itemId] > 1) {
        state.cartItem[itemId] -= 1;
      } else {
        delete state.cartItem[itemId];
      }
    },
    addToCartTotal(state, action) {
      state.cartTotal = action.payload;
    },
    deliveryFeeAdd(state, action) {
      state.deliveryFee = action.payload;
    },
    setToken(state,action){
      state.token = action.payload;
    }

  },
});

export const {
  setCartItem,
  addToCart,
  removeFromCart,
  addToCartTotal,
  deliveryFeeAdd,
  setToken
} = cartSlice.actions;
export default cartSlice.reducer;
