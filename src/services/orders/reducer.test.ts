import { clearOrder, orderSlice } from "./reducer"
import { orderMock } from "../mockData"
import { OrderState } from "../../models"
import { createOrder } from "./actions"


describe('Тесты для orderSlice', () => {
  test('Тест экшена clearOrder', () => {
    const changedState = orderSlice.reducer({ order: orderMock, isLoading: false }, clearOrder())

    expect(changedState.order).toBeNull()
  })

  test('Тест экшена createOrder.pending', () => {
    const changedState = orderSlice.reducer({ order: null, isLoading: false }, createOrder.pending('', []))

    expect(changedState.isLoading).toBe(true)
  })

  test('Тест экшена createOrder.fulfilled', () => {
    const changedState = orderSlice.reducer({ order: null, isLoading: true }, createOrder.fulfilled(orderMock, '', ['']))

    expect(changedState.order).toEqual(orderMock)
    expect(changedState.isLoading).toBe(false)
  })

  test('Тест экшена createOrder.rejected', () => {
    const changedState = orderSlice.reducer({ order: null, isLoading: true }, createOrder.rejected(new Error('error'), 'тестовая ошибка', ['']))

    expect(changedState.isLoading).toBe(false)
  })
})
