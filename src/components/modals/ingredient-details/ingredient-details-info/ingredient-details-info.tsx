import { IngredientDetailsInfoProps } from '../../../../models';
import styles from './ingredient-details-info.module.scss'

export const IngredientDetailsInfo = (props: IngredientDetailsInfoProps) => {
  return (
    <div>
      <p className={styles.itemType}>{props.type}</p>
      <p className={styles.itemValue}>{props.value}</p>
    </div>
  );
}