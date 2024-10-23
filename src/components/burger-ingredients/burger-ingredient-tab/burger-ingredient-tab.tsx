import { BurgerIngredientTabProps } from '../../../models';
import { BurgerIngredientItem } from './burger-ingredient-item/burger-ingredient-item'
import styles from './burger-ingredient-tab.module.scss'

export const BurgerIngredientTab = (props: BurgerIngredientTabProps) => {
  return (
    <>
      <h3 style={{ marginTop: 0, marginBottom: 0 }} className="text text_type_main-medium">{props.name}</h3>
      <div className={styles.itemsContainer}>
        { props.items && props.items.map(x => (
          <BurgerIngredientItem key={x._id} item={x} onClick={() => { props.onSelect(x); }} />
        )) }
      </div>
    </>
  )
}
