import { useSelector } from "react-redux";
import { getFeedOrders, getFeedTotal, getFeedTotalToday } from "../../../services/feed/reducer";
import styles from './feed-total.module.scss'
import { useMemo } from "react";

export const FeedTotal = () => {
  const orders = useSelector(getFeedOrders)
  const total = useSelector(getFeedTotal)
  const totalToday = useSelector(getFeedTotalToday)

  const readyOrders = orders.filter((order) => order.status === 'done').map((order) => order.number).slice(0, 10)
  const inProgressOrders = orders.filter((order) => order.status === 'pending').map((order) => order.number).slice(0, 10)

  return (
    <div className={styles.container}>
      <div className={styles.status}>
        <div className={styles.statusColumn}>
          <p className='text text_type_main-medium'>Готовы:</p>
          <div className={styles.orderNumbers}>
            {readyOrders.map((orderNumber) => (
              <p key={orderNumber} className={styles.orderNumberReady}>{orderNumber}</p>
            ))}
          </div>
        </div>
        <div className={styles.statusColumn}>
          <p className='text text_type_main-medium'>В работе:</p>
          <div className={styles.orderNumbers}>
            {inProgressOrders.map((orderNumber) => (
              <p key={orderNumber} className={styles.orderNumber}>{orderNumber}</p>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.total}>
        <p className="text text_type_main-medium">Выполнено за все время:</p>
        <p className="text text_type_digits-large">{total}</p>
      </div>
      <div className={styles.total}>
        <p className="text text_type_main-medium">Выполнено за сегодня:</p>
        <p className="text text_type_digits-large">{totalToday}</p>
      </div>
    </div>
  );
}
