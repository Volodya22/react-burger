import { BurgerIngredient, FeedState, LoginData, Order, OrderData, UserFullData } from "../models"

const getOrderData = (number: number, status: string): OrderData => {
  return {
    _id: String(number),
    createdAt: "2024-02-02",
    ingredients: [String(number), String(number * 2), String(number)],
    number: number,
    status: status,
    updatedAt: "2024-03-03",
    name: "test" + number,
    price: number * 100
  }
}

export const getBurgerIngredient = (number: number, type: string = "test"): BurgerIngredient => {
  return {
    __v: number,
    _id: String(number),
    calories: 10 * number,
    carbohydrates: 20 * number,
    fat: 30 * number,
    image: "test_img_" + number,
    image_large: "test_image_lg_" + number,
    image_mobile: "test_image_m_" + number,
    name: "test_" + number,
    price: 100 * number,
    proteins: 50 * number,
    type: type
  }
}

export const feedDataMock: FeedState = {
  orders: [getOrderData(1, 'done'), getOrderData(2, 'pending')],
  total: 2,
  totalToday: 1
}

export const orderMock: Order = {
  name: 'test_order',
  order: getOrderData(1, 'done'),
  success: true
}

export const burgerIngredientMock: BurgerIngredient = getBurgerIngredient(1, "test")

export const loginDataMock: LoginData = {
  email: "test_email",
  password: "test_pwd"
}

export const userFullDataMock: UserFullData = {
  email: "test",
  name: "test1",
  password: "test2"
}
