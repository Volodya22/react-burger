import { CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components"
import styles from './burger-constructor-total.module.scss'

export const BurgerConstructorTotal = (props: { onClick: () => void }) => {
  return (
    <div className={styles.price}>
      <div className={styles.priceValue}>
        <p className="text text_type_digits-medium pr-2">610</p>
        <CurrencyIcon type="primary" />
      </div>
      <Button htmlType="button" type="primary" size="large" onClick={props.onClick}>
        Оформить заказ
      </Button>
    </div>
  );
}