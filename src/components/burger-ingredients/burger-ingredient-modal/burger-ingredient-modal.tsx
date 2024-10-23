import { BurgerIngredientInfo } from './burger-ingredient-info/burger-ingredient-info';
import styles from './burger-ingredient-modal.module.scss'

export const BurgerIngredientModal = (props: any) => {
  return (
    <div className={styles.itemData}>
      <p className={styles.title}>Детали ингредиета</p>
      <img src={props.image} className={styles.image} />
      <p className={styles.itemName}>{props.name}</p>
      <div className={styles.info}>
        <BurgerIngredientInfo type="Калории, ккал" value={props.calories} />
        <BurgerIngredientInfo type="Белки, г" value={props.proteins} />
        <BurgerIngredientInfo type="Жиры, г" value={props.fat} />
        <BurgerIngredientInfo type="Углеводы, г" value={props.carbohydrates} />
      </div>
    </div>
  );
}