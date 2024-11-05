import { ApiResponse, BurgerIngredient, IngredientsRequestResult, Order, OrderRequest, } from "../models";

const ApiUrl: string = "https://norma.nomoreparties.space/api/";

function checkResponse(res: Response) {
  if (res.ok) {
    return res.json();
  }

  Promise.reject(`Ошибка: ${res.status}`)
}

function checkSuccess(res: ApiResponse) {
  if (res && res.success) {
    return res;
  }

  return Promise.reject(`Ошибка: ${res} не имеет статус success`);
}

function request<T>(url: string, options: RequestInit | undefined = undefined): Promise<T> {
  return fetch(`${ApiUrl}${url}`, options)
    .then(checkResponse)
    .then(checkSuccess)
    .then(res => {
      return res as T;
    });
}

export const getIngredientsData = async (): Promise<BurgerIngredient[]> => {
  const result = await request<IngredientsRequestResult>('ingredients')
  return result.data
}

export const createNewOrder = async (orderRequest: OrderRequest): Promise<Order> => {
  return await request<Order>('orders', {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderRequest)
  })
}
