import { BurgerIngredient } from '../../../models';
import { IngredientDetailsInfo } from './ingredient-details-info/ingredient-details-info';
import styles from './ingredient-details.module.scss'

export const IngredientDetails = (props: { item: BurgerIngredient }) => {
  return (
    <div className={styles.itemData}>
      <p className={styles.title}>Детали ингредиета</p>
      <img src={props.item.image_large} className={styles.image} />
      <p className={styles.itemName}>{props.item.name}</p>
      <div className={styles.info}>
        <IngredientDetailsInfo type="Калории, ккал" value={props.item.calories} />
        <IngredientDetailsInfo type="Белки, г" value={props.item.proteins} />
        <IngredientDetailsInfo type="Жиры, г" value={props.item.fat} />
        <IngredientDetailsInfo type="Углеводы, г" value={props.item.carbohydrates} />
      </div>
    </div>
  );
};
