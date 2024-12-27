import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FeedState, OrdersHistoryState } from "../../models";

const initialState: OrdersHistoryState = {
  historyOrders: [],
  historyTotal: 0,
  historyTotalToday: 0
}

export const ordersHistorySlice = createSlice({
  name: 'ordersHistory',
  initialState,
  reducers: {
    setOrdersHistoryData: (state, action: PayloadAction<FeedState>) => {
      state.historyOrders = action.payload.orders
      state.historyTotal = action.payload.total
      state.historyTotalToday = action.payload.totalToday
    }
  },
  selectors: {
    getOrdersHistory: state => state.historyOrders
  }
})

export const { getOrdersHistory } = ordersHistorySlice.selectors

export const { setOrdersHistoryData } = ordersHistorySlice.actions
