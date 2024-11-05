import { useSelector } from 'react-redux';
import { IngredientDetailsInfo } from './ingredient-details-info/ingredient-details-info';
import styles from './ingredient-details.module.scss'
import { getSelectedItem } from '../../../services/ingredients/reducer';

export const IngredientDetails = () => {
  const item = useSelector(getSelectedItem);

  return (
    item &&
    <div className={styles.itemData}>
      <p className={styles.title}>Детали ингредиета</p>
      <img src={item.image_large} className={styles.image} alt={item.name} />
      <p className={styles.itemName}>{item.name}</p>
      <div className={styles.info}>
        <IngredientDetailsInfo type="Калории, ккал" value={item.calories} />
        <IngredientDetailsInfo type="Белки, г" value={item.proteins} />
        <IngredientDetailsInfo type="Жиры, г" value={item.fat} />
        <IngredientDetailsInfo type="Углеводы, г" value={item.carbohydrates} />
      </div>
    </div>
  );
};
