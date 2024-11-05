import { CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components"
import styles from './burger-constructor-total.module.scss'
import { shallowEqual, useSelector } from "react-redux";
import { getBun, getConstructorIngredients, getOrderItemIds } from "../../../services/ingredients/reducer";
import { useMemo } from "react";
import { useAppDispatch } from "../../../services/store";
import { createOrder } from "../../../services/orders/actions";
import { isOrderLoading } from "../../../services/orders/reducer";

export const BurgerConstructorTotal = () => {
  const bun = useSelector(getBun);
  const ingredients = useSelector(getConstructorIngredients);
  const isLoading = useSelector(isOrderLoading);
  const itemIds = useSelector(getOrderItemIds, shallowEqual);
  const dispatch = useAppDispatch();

  const getPrice = useMemo(() => {
    return (bun?.price ?? 0) * 2 + ingredients.reduce((prev, cur) => { return prev + cur.price; }, 0);
  }, [bun, ingredients]);

  const createNewOrder = () => {
    dispatch(createOrder(itemIds));
  }

  return (
    <div className={styles.price}>
      <div className={styles.priceValue}>
        <p className="text text_type_digits-medium pr-2">{getPrice}</p>
        <CurrencyIcon type="primary" />
      </div>
      <Button htmlType="button" type="primary" size="large" onClick={createNewOrder} disabled={!bun || ingredients.length === 0 || isLoading}>
        Оформить заказ
      </Button>
    </div>
  );
}
