import styles from './order-details.module.scss'
import layer1 from '../../../images/Vector 1.svg'
import layer2 from '../../../images/Vector 2.svg'
import layer3 from '../../../images/Vector 3.svg'
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useSelector } from 'react-redux'
import { getOrder } from '../../../services/orders/reducer'

export const OrderDetails = () => {
  const order = useSelector(getOrder);

  return (
    <div className={styles.orderData}>
      <p className={styles.bigText}>{order!.order.number}</p>
      <p className={styles.text}>идентификатор заказа</p>
      <div className={styles.check}>
        <img src={layer1} className={styles.layer1} alt='Анимация успешного заказа' />
        <img src={layer2} className={styles.layer2} alt='Анимация успешного заказа' />
        <img src={layer3} className={styles.layer3} alt='Анимация успешного заказа' />
        <CheckMarkIcon type="primary" className={styles.icon} />
      </div>
      <p className={styles.bottomText}>Ваш заказ начали готовить</p>
      <p className={styles.bottomTextBlue}>Доджитесь готовности на орбитальной станции</p>
    </div>
  )
};
