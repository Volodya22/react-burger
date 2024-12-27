import { Link, useLocation } from "react-router-dom"
import { BurgerIngredient, OrderProps } from "../../models"
import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components"
import styles from './order.module.scss'
import { useAppSelector } from "../../services/store"
import { getIngredientsMap } from "../../services/ingredients/reducer"

const maxIngredients = 6;

export const Order = (props: OrderProps) => {
  const location = useLocation();
  const ingredientsMap: { [key: string]: BurgerIngredient } = useAppSelector(getIngredientsMap)
  const hiddenIngredientsCount = props.item.ingredients.length - maxIngredients
  const path = `/${props.path}/${props.item.number}`

  return (
    <Link to={path} state={{ backgroundLocation: location }}>
      <div className={styles.order}>
        <div className={styles.orderInfo}>
          <p className={styles.orderNumber}>#{props.item.number}</p>
          <p className="text text_type_main-default text_color_inactive">
            <FormattedDate date={new Date(props.item.createdAt)} />
          </p>
        </div>
        <p className={styles.orderName}>{props.item.name}</p>
        <div className={styles.orderInfo}>
          <div className={styles.ingredients}>
            { props.item.ingredients.slice(0, 6).map((ingredientId, index) => {
              const ingredient = ingredientsMap[ingredientId]
              const zIndex = maxIngredients - index
              const right = 20 * index

              if (!ingredient) {
                return null
              }

              return (
                <div key={ingredient._id + index} className={styles.imageWrapper} style={{ zIndex: zIndex, right: right }}>
                  <img src={ingredient.image} alt={`Ингридиент ${index + 1}`} style={{ opacity: hiddenIngredientsCount > 0 && index + 1 === maxIngredients ? '0.5' : '1' }} />
                  { maxIngredients === index + 1 ? (
                    <span className={styles.remaining}>
                      { hiddenIngredientsCount > 0 ? `+${hiddenIngredientsCount}` : null }
                    </span>
                  ) : null }
                </div>
              )
            }) }
          </div>
          <div className={styles.price}>
            <p className="text text_type_digits-default">
              { props.item.ingredients.reduce((total, ingredientId) => {
                const ingredient = ingredientsMap[String(ingredientId)];
                return total + (ingredient?.price || 0);
              }, 0) }
            </p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </Link>
  )
}
