import { configureStore } from "@reduxjs/toolkit";
import { ordersHistorySlice, setOrdersHistoryData } from "./reducer";
import { feedDataMock } from "../mockData";

const setupStore = () =>
  configureStore({
    reducer: {
      orderHistory: ordersHistorySlice.reducer,
    },
  })

describe('Тесты для ordersHistorySlice', () => {
  test('Тест экшена setOrdersHistoryData', () => {
    const store = setupStore()

    store.dispatch(setOrdersHistoryData(feedDataMock))

    const state = store.getState().orderHistory

    expect(state.historyOrders).toEqual(feedDataMock.orders)
    expect(state.historyTotal).toBe(feedDataMock.total)
    expect(state.historyTotalToday).toBe(feedDataMock.totalToday)
  })
})
