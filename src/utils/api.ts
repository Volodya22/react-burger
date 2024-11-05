import { BurgerIngredient, Order, OrderRequest } from "../models";

const ApiUrl: string = "https://norma.nomoreparties.space/api/";

export const getIngredientsData = async (): Promise<BurgerIngredient[]> => {
  try {
    const data = await fetch(`${ApiUrl}ingredients`);
    const result = await data.json();

    return result.success ? result.data as BurgerIngredient[] : [];
  } catch (e) {
    console.error(e);
    return [];
  }
}

export const createNewOrder = async (request: OrderRequest): Promise<Order | null> => {
  try {
    const data = await fetch(`${ApiUrl}orders`, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request)
    });
    const result = await data.json();

    return result.success ? result as Order : null;
  } catch (e) {
    console.error(e);
    return null;
  }
}
