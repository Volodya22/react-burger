import { Tab } from "@ya.praktikum/react-developer-burger-ui-components"
import React from "react"
import styles from './burger-ingredients.module.scss'
import { BurgerIngredientTab } from './burger-ingredient-tab/burger-ingredient-tab'

export const BurgerIngredients = (props: any) => {
  const [current, setCurrent] = React.useState('buns')

  const groups = [{
    name: "Булки",
    type: "bun",
  }, {
    name: "Соусы",
    type: "sauce",
  }, {
    name: "Начинки",
    type: "main",
  }];

  return (
    <div style={{ width: 600 }}>
      <div className={styles.header}>
        <p style={{ margin: 0 }} className="text text_type_main-large">Соберите бургер</p>
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
      <div className={styles.tab}>
        { props.data && props.data.length > 0 && groups.map(x => (
          <BurgerIngredientTab items={props.data.filter((c: any) => c.type === x.type)} name={x.name} />
        ))}        
      </div>
    </div>
  )
}
