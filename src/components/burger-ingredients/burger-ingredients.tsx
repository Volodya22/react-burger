import { Tab } from "@ya.praktikum/react-developer-burger-ui-components"
import React from "react"
import styles from './burger-ingredients.module.scss'
import { BurgerIngredientTab } from './burger-ingredient-tab/burger-ingredient-tab'
import Modal from "../modals/modal/modal"
import useModal from "../../hooks/use-modal"
import { BurgerIngredientModal } from "./burger-ingredient-modal/burger-ingredient-modal"

export const BurgerIngredients = (props: any) => {
  const [current, setCurrent] = React.useState('buns');
  const [currentItem, setCurrentItem] = React.useState<any>(null);
  const { isOpen, toggle } = useModal();

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
          <BurgerIngredientTab key={x.name} items={props.data.filter((c: any) => c.type === x.type)} name={x.name} onClick={toggle} select={setCurrentItem} />
        ))}        
      </div>
      <Modal wrapperId="item-modal" isOpen={isOpen} title="Детали ингредиета" toggle={toggle}>
        <BurgerIngredientModal {...currentItem} />
      </Modal>
    </div>
  )
}
