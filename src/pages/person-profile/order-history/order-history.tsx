import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../services/store'
import styles from './order-history.module.scss'
import { ordersHistoryConnect, ordersHistoryDisconnect } from '../../../services/orders-history/actions'
import { getOrdersHistory } from '../../../services/orders-history/reducer'
import { Order } from '../../../components/order/order'

export const OrderHistoryPage = () => {
  const dispatch = useAppDispatch()

  const orders = useAppSelector(getOrdersHistory)

  useEffect(() => {
    dispatch(ordersHistoryConnect())

    return () => {
      dispatch(ordersHistoryDisconnect())
    }
  }, [dispatch])

  return (
    <div className={styles.container}>
      { orders.length === 0 && (<p>Загрузка...</p>) }
      { orders.length > 0 && (
        <>
          <div className={styles.ordersContainer}>
            { orders.map((order) => {
              return (<Order key={order._id} item={order} path='profile/orders' />)
            }) }
          </div>
        </>
      )}
    </div>
  )
}
