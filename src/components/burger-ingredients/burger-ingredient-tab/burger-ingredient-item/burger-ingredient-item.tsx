import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import styles from './burger-ingredient-item.module.scss'

export const BurgerIngredientItem = (props: any) => {
  return (
    <div className={styles.itemContainer} onClick={props.onClick}>
      <div className={styles.imageContainer}>
        <img src={props.image} />
      </div>
      <div className={styles.price}>
        <span style={{ marginRight: 8 }} className="text text_type_main-default">{props.price}</span>
        <CurrencyIcon type="primary" />
      </div>
      <div className={styles.name}>
        <p style={{ textAlign: "center" }} className="text text_type_main-default">{props.name}</p>
      </div>
      { props.price % 5 === 0 && <Counter count={1} size="default" extraClass="m-1" /> }
    </div>
  );
}