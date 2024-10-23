import styles from './burger-constructor-modal.module.scss'
import layer1 from '../../../images/Vector 1.svg'
import layer2 from '../../../images/Vector 2.svg'
import layer3 from '../../../images/Vector 3.svg'
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components'

export const BurgerConstructorModal = () => {
  return (
    <div className={styles.orderData}>
      <p className={styles.bigText}>034536</p>
      <p className={styles.text}>идентификатор заказа</p>
      <div className={styles.check}>
        <img src={layer1} className={styles.layer1} />
        <img src={layer2} className={styles.layer2} />
        <img src={layer3} className={styles.layer3} />
        <CheckMarkIcon type="primary" className={styles.icon} />
      </div>
      <p className={styles.bottomText}>Ваш заказ начали готовить</p>
      <p className={styles.bottomTextBlue}>Доджитесь готовности на орбитальной станции</p>
    </div>
  )
}