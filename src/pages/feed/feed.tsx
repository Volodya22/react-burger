import { useEffect } from 'react'
import styles from './feed.module.scss'
import { useAppDispatch, useAppSelector } from '../../services/store'
import { feedConnect, feedDisconnect } from '../../services/feed/actions'
import { FeedTotal } from './feed-total/feed-total'
import { getFeedOrders } from '../../services/feed/reducer'
import { Order } from '../../components/order/order'

export const FeedPage = () => {
  const dispatch = useAppDispatch()

  const orders = useAppSelector(getFeedOrders)

  useEffect(() => {
    dispatch(feedConnect())

    return () => {
      dispatch(feedDisconnect())
    }
  }, [dispatch])

  return (
    <>
      <p className='text text_type_main-large'>Лента заказов</p>
      <div className={styles.container}>
        { orders.length === 0 && (<p>Загрузка...</p>) }
        { orders.length > 0 && (
          <>
            <div className={styles.ordersContainer}>
              { orders.map((order) => {
                return (<Order key={order._id} item={order} path='feed' />)
              }) }
            </div>
            <FeedTotal />
          </>
        )}
      </div>
    </>
  )
}
