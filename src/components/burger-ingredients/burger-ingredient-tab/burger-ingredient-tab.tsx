import { BurgerIngredientItem } from './burger-ingredient-item/burger-ingredient-item'
import styles from './burger-ingredient-tab.module.scss'

export const BurgerIngredientTab = (props: any) => {
  return (
    <>
      <h3 style={{ marginTop: 0, marginBottom: 0 }} className="text text_type_main-medium">{props.name}</h3>
      <div className={styles.itemsContainer}>
        { props.items && props.items.map((x: any) => (
          <BurgerIngredientItem key={x._id} image={x.image} price={x.price} name={x.name} onClick={(e: any) => { props.select(x); props.onClick(); }} />
        )) }
      </div>
    </>
  )
}
