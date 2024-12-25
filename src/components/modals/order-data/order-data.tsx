import { useNavigate, useParams } from "react-router";
import { OrderData } from "../../../models"
import { useAppSelector } from "../../../services/store";
import { getFeedOrders } from "../../../services/feed/reducer";
import { useEffect, useState } from "react";
import styles from './order-data.module.scss'
import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { getIngredientsMap } from "../../../services/ingredients/reducer";
import { getOrdersHistory } from "../../../services/orders-history/reducer";
import { getOrder } from "../../../utils/api";

export const OrderDataPage = () => {
  const { number } = useParams<{ number: string }>()
  const feedOrders = useAppSelector(getFeedOrders)
  const historyOrders = useAppSelector(getOrdersHistory)
  const ingredientsMap = useAppSelector(getIngredientsMap)

  const [order, setOrder] = useState<OrderData | null>(null)

  const navigate = useNavigate()

  useEffect(() => {
    if (!number) {
      navigate('/', { replace: true })
    }

    let existingOrder = feedOrders.find(x => x.number === parseInt(number!)) ?? historyOrders.find(x => x.number == parseInt(number!))
    if (!existingOrder) {
      getOrder(number!).then((orderData) => setOrder(orderData.orders[0]))
    } else {
      setOrder(existingOrder)
    }
  }, [number, navigate])

  if (!order) {
    return (<p>Загрузка...</p>)
  }

  const countIngredients = (ingredients: string[]) => {
    const map: { [key: string]: number } = {};

    ingredients.forEach((ingredientId) => {
      if (map[ingredientId]) {
        map[ingredientId]++
      } else {
        map[ingredientId] = 1
      }
    })

    return map
  };

  const ingredientsCountMap = countIngredients(order.ingredients)
  const distinctIngredients = Object.keys(ingredientsCountMap)

  return (
    <>
      { order && (
        <div className={styles.container}>
          <div className={styles.orderData}>
            <p className={styles.orderNumber}>#{order.number}</p>
            <p className={styles.orderName}>{order.name}</p>
            <p className='text text_type_main-small' style={{ color: order.status === 'done' ? '#00CCCC' : '#FFFFFF' }}>{order.status === 'done' ? 'Выполнен' : 'В процессе'}</p>
            <p className={styles.contains}>Состав:</p>
            <div className={styles.ingredients}>
              { distinctIngredients.map((ingredientId, index) => {
                const ingredient = ingredientsMap[ingredientId]
                if (!ingredient) {
                  return null
                }

                return (
                  <div key={ingredient._id + index} className={styles.ingredient}>
                    <div className={styles.imageWrapper}>
                      <img src={ingredient.image} alt={`Ингридиент ${index + 1}`} />
                    </div>
                    <p className="text text_type_main-small">{ingredient.name}</p>
                    <div className={styles.price}>
                      <p className="text text_type_main-small">
                        {ingredientsCountMap[ingredientId]} x {ingredient.price}
                      </p>
                      <CurrencyIcon type="primary" />
                    </div>
                  </div>
                )
              }) }
            </div>
            <div className={styles.footer}>
              <p className="text text_type_main-default text_color_inactive">
                <FormattedDate date={new Date(order.createdAt)} />
              </p>
              <div className={styles.price}>
                <p className="text text_type_digits-default">
                  { order.ingredients.reduce((total, ingredientId) => {
                    const ingredient = ingredientsMap[String(ingredientId)];
                    return total + (ingredient?.price || 0);
                  }, 0) }
                </p>
                <CurrencyIcon type="primary" />
              </div>
            </div>
          </div>
        </div>
      ) }
    </>
  )
}
