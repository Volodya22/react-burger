import { createSlice } from "@reduxjs/toolkit";
import { OrderState } from "../../models";
import { createOrder } from "./actions";

const initialState: OrderState = {
  order: null,
  isLoading: false
}

export const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.order = null;
    }
  },
  selectors: {
    getOrder: state => state.order,
    isOrderLoading: state => state.isLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.order = action.payload;
        state.isLoading = false;
      })
      .addCase(createOrder.rejected, (state) => {
        state.isLoading = false;
      })
  }
});

export const { getOrder, isOrderLoading } = orderSlice.selectors;

export const { clearOrder } = orderSlice.actions;
