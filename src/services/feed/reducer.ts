import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FeedState } from "../../models";

const initialState: FeedState = {
  orders: [],
  total: 0,
  totalToday: 0
}

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    setFeedData: (state, action: PayloadAction<FeedState>) => {
      state.orders = action.payload.orders
      state.total = action.payload.total
      state.totalToday = action.payload.totalToday
    }
  },
  selectors: {
    getFeedOrders: state => state.orders,
    getFeedTotal: state => state.total,
    getFeedTotalToday: state => state.totalToday
  }
})

export const { getFeedOrders, getFeedTotal, getFeedTotalToday } = feedSlice.selectors

export const { setFeedData } = feedSlice.actions
