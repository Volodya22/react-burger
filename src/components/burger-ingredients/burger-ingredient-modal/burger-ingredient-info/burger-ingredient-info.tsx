import styles from './burger-ingredient-info.module.scss'

export const BurgerIngredientInfo = (props: any) => {
  return (
    <div>
      <p className={styles.itemType}>{props.type}</p>
      <p className={styles.itemValue}>{props.value}</p>
    </div>
  );
}