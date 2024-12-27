import { CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components"
import styles from './burger-constructor-total.module.scss'
import { shallowEqual } from "react-redux";
import { getBun, getConstructorIngredients, getOrderItemIds } from "../../../services/ingredients/reducer";
import { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../../services/store";
import { createOrder } from "../../../services/orders/actions";
import { isOrderLoading } from "../../../services/orders/reducer";
import { userData } from "../../../services/auth/reducer";
import { useNavigate } from "react-router";

export const BurgerConstructorTotal = () => {
  const bun = useAppSelector(getBun);
  const ingredients = useAppSelector(getConstructorIngredients);
  const isLoading = useAppSelector(isOrderLoading);
  const itemIds = useAppSelector(getOrderItemIds, shallowEqual);
  const user = useAppSelector(userData)

  const dispatch = useAppDispatch();

  const navigate = useNavigate()

  const getPrice = useMemo(() => {
    return (bun?.price ?? 0) * 2 + ingredients.reduce((prev, cur) => { return prev + cur.price; }, 0);
  }, [bun, ingredients]);

  const createNewOrder = () => {
    if (user) {
      dispatch(createOrder(itemIds));
    } else {
      navigate('/login', { replace: true });
    }
  }

  return (
    <div className={styles.price}>
      <div className={styles.priceValue}>
        <p className="text text_type_digits-medium pr-2">{getPrice}</p>
        <CurrencyIcon type="primary" />
      </div>
      {
        isLoading ? (
          <p>Обработка заказа...</p>
        ) : (
          <Button htmlType="button" type="primary" size="large" onClick={createNewOrder} disabled={!bun || ingredients.length === 0}>
            Оформить заказ
          </Button>
        )
      }
    </div>
  );
}
