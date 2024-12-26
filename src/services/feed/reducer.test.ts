import { configureStore } from "@reduxjs/toolkit";
import { feedDataMock } from "../mockData";
import { feedSlice, setFeedData } from "./reducer";

const setupStore = () =>
  configureStore({
    reducer: {
      orderHistory: feedSlice.reducer,
    },
  });

describe('Тесты для feedSlice', () => {
  test('Тест экшена setFeedData', () => {
    const store = setupStore()

    store.dispatch(setFeedData(feedDataMock))

    const state = store.getState().orderHistory

    expect(state.orders).toEqual(feedDataMock.orders)
    expect(state.total).toBe(feedDataMock.total)
    expect(state.totalToday).toBe(feedDataMock.totalToday)
  })
})
