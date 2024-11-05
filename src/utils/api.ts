import { BurgerIngredient, Order, OrderRequest } from "../models";

const ApiUrl: string = "https://norma.nomoreparties.space/api/";

export const getIngredientsData = async (): Promise<BurgerIngredient[]> => {
  try {
    var data = await fetch(`${ApiUrl}ingredients`);
    return (await data.json()).data as BurgerIngredient[];
  } catch (e) {
    console.error(e);
    return [];
  }
}

export const createNewOrder = async (request: OrderRequest): Promise<Order | null> => {
  try {
    var data = await fetch(`${ApiUrl}orders`, {
      method: "POST",
      body: JSON.stringify(request)
    });

    return (await data.json()) as Order;
  } catch (e) {
    console.error(e);
    return null;
  }
}
