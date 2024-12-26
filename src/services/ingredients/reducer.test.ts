import { IngredientsState } from "../../models"
import { burgerIngredientMock, getBurgerIngredient } from "../mockData"
import { getIngredients } from "./actions"
import { addIngredient, clearConstructor, deleteIngredient, ingredientsSlice, moveIngredient, selectIngredient } from "./reducer"

const initialState: IngredientsState = {
  ingredients: [],
  constructorIngredients: {
    bun: null,
    ingredients: []
  },
  selectedIngredient: null,
  isLoading: false,
  ingredientsMap: {}
}

describe('Тесты для ingredientsSlice', () => {
  test('Тест экшена selectIngredient', () => {
    const changedState = ingredientsSlice.reducer(initialState, selectIngredient(burgerIngredientMock))

    expect(changedState.selectedIngredient).toEqual(burgerIngredientMock)
  })

  test('Тест экшена addIngredient для отсутствующего ингридиента', () => {
    const changedState = ingredientsSlice.reducer(initialState, addIngredient({ id: "test" }))

    expect(changedState.constructorIngredients.bun).toBeNull()
    expect(changedState.constructorIngredients.ingredients).toHaveLength(0)
  })

  test('Тест экшена addIngredient для булочки', () => {
    const state = { ...initialState, ingredients: [getBurgerIngredient(1, "bun")] }
    const changedState = ingredientsSlice.reducer(state, addIngredient({ id: "1" }))

    expect(changedState.constructorIngredients.bun).not.toBeNull()
    expect(changedState.constructorIngredients.ingredients).toHaveLength(0)
  })

  test('Тест экшена addIngredient для обычного ингридиента', () => {
    const state = { ...initialState, ingredients: [getBurgerIngredient(1)] }
    const changedState = ingredientsSlice.reducer(state, addIngredient({ id: "1" }))

    expect(changedState.constructorIngredients.bun).toBeNull()
    expect(changedState.constructorIngredients.ingredients).toHaveLength(1)
  })

  test('Тест экшена deleteIngredient', () => {
    const ingredient = getBurgerIngredient(1)
    const state = { ...initialState, ingredients: [ingredient] }
    const constructorIngredient = { ...ingredient, itemId: "1" }
    const changedState = ingredientsSlice.reducer(state, deleteIngredient(constructorIngredient))

    expect(changedState.constructorIngredients.bun).toBeNull()
    expect(changedState.constructorIngredients.ingredients).toHaveLength(0)
  })

  test('Тест экшена moveIngredient', () => {
    const first = getBurgerIngredient(1)
    const firstTaken = { ...first, itemId: "1" }
    const second = getBurgerIngredient(2)
    const secondTaken = { ...second, itemId: "2" }
    const state = { ...initialState, ingredients: [first, second], constructorIngredients: { bun: null, ingredients: [firstTaken, secondTaken] } }
    const changedState = ingredientsSlice.reducer(state, moveIngredient({ fromIndex: 0, toIndex: 1 }))

    expect(changedState.constructorIngredients.bun).toBeNull()
    expect(changedState.constructorIngredients.ingredients).toHaveLength(2)
    expect(changedState.constructorIngredients.ingredients[0]).toEqual(secondTaken)
    expect(changedState.constructorIngredients.ingredients[1]).toEqual(firstTaken)
  })

  test('Тест экшена clearConstructor', () => {
    const first = getBurgerIngredient(1, "bun")
    const firstTaken = { ...first, itemId: "1" }
    const second = getBurgerIngredient(2)
    const secondTaken = { ...second, itemId: "2" }
    const third = getBurgerIngredient(3)
    const thirdTaken = { ...second, itemId: "3" }
    const state = { ...initialState, ingredients: [first, second, third], constructorIngredients: { bun: firstTaken, ingredients: [secondTaken, thirdTaken] } }
    const changedState = ingredientsSlice.reducer(state, clearConstructor())

    expect(changedState.constructorIngredients.bun).toBeNull()
    expect(changedState.constructorIngredients.ingredients).toHaveLength(0)
  })
  
  test('Тест экшена createOrder.pending', () => {
    const changedState = ingredientsSlice.reducer(initialState, getIngredients.pending(''))

    expect(changedState.isLoading).toBe(true)
  })

  test('Тест экшена createOrder.fulfilled', () => {
    const payload = [getBurgerIngredient(1, "bun"), getBurgerIngredient(2)]
    const map = Object.assign({}, ...payload.map((x) => ({[x._id]: x})))
    const changedState = ingredientsSlice.reducer({ ...initialState, isLoading: true }, getIngredients.fulfilled(payload, ''))

    expect(changedState.ingredients).toEqual(payload)
    expect(changedState.ingredientsMap).toEqual(map)
    expect(changedState.isLoading).toBe(false)
  })

  test('Тест экшена createOrder.rejected', () => {
    const changedState = ingredientsSlice.reducer({ ...initialState, isLoading: true }, getIngredients.rejected(new Error('error'), 'тестовая ошибка'))

    expect(changedState.isLoading).toBe(false)
  })
})
