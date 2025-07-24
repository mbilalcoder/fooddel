import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../config/api";

export const fetchFoodList = createAsyncThunk(
  "food/fetchFoodList",
  async () => {
    const response = await axios.get(`${BASE_URL}/api/food/list`);
    return response.data.data;
  }
);
export const fetchCart = createAsyncThunk(
  "food/fetchCart",
  async () => {
    const response = await axios.get(`${BASE_URL}/api/cart/get`,{headers:{token:localStorage.getItem("token")}})
    return response.data.cartData;
  }
);
export const fetchOrders = createAsyncThunk(
  "food/fetchOrders",
  async () => {
    const response = await axios.get(`${BASE_URL}/api/order/get`,{headers:{token:localStorage.getItem("token")}})
    return response.data.orderData;
  }
);

const foodSlice = createSlice({
  name: "food",
  initialState: {
    food_list: [],
    loading: false,
    error: null,
    fetchedCart:[],
    ordersData:[]
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFoodList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFoodList.fulfilled, (state, action) => {
        state.loading = false;
        state.food_list = action.payload;
      })
      .addCase(fetchFoodList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.ordersData = action.payload;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.fetchedCart = action.payload;
      });
  },
});

export default foodSlice.reducer;
