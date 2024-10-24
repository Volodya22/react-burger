import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import styles from './burger-ingredient-item.module.scss'
import { BurgerIngredientItemProps } from "../../../../models";

export const BurgerIngredientItem = (props: BurgerIngredientItemProps) => {
  return (
    <div className={styles.itemContainer} onClick={props.onClick}>
      <div className={styles.imageContainer}>
        <img src={props.item.image} alt={props.item.name} />
      </div>
      <div className={styles.price}>
        <span className="text text_type_main-default mr-2">{props.item.price}</span>
        <CurrencyIcon type="primary" />
      </div>
      <div className={styles.name}>
        <p className={styles.nameText}>{props.item.name}</p>
      </div>
      { props.item.price % 5 === 0 && <Counter count={1} size="default" extraClass="m-1" /> }
    </div>
  );
};
