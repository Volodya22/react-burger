import { IngredientDetailsInfo } from './ingredient-details-info/ingredient-details-info';
import styles from './ingredient-details.module.scss'
import { getAllIngredients, getSelectedItem } from '../../../services/ingredients/reducer';
import { useAppSelector } from '../../../services/store';
import { useNavigate, useParams } from 'react-router';
import { useEffect } from 'react';

type IngredientDetailsProps = {
  locationState: { background: Location };
}

export const IngredientDetails = () => {
  const { id } = useParams<{ id: string }>();
  const items = useAppSelector(getAllIngredients);

  const navigate = useNavigate();

  const item = items.find(x => x._id == id);

  useEffect(() => {
    if (!id) {
      navigate('/', { replace: true });
    }
  }, [id, navigate])

  return (
    item &&
    <div className={styles.container}>
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
    </div>
  );
};
