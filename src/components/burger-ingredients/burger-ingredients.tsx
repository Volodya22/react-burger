import { Tab } from "@ya.praktikum/react-developer-burger-ui-components"
import React from "react"
import styles from './burger-ingredients.module.scss'
import { BurgerIngredientTab } from './burger-ingredient-tab/burger-ingredient-tab'

export const BurgerIngredients = () => {
  const [current, setCurrent] = React.useState('buns')
  return (
    <div>
      <div className={styles.header}>
        <p style={{ margin: 0 }}>Соберите бургер</p>
      </div>
      <div style={{ display: 'flex' }}>
        <Tab value="buns" active={current === 'buns'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="sauces" active={current === 'sauces'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="fillings" active={current === 'fillings'} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
    </div>
  )
}
