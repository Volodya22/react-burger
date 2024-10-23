import { Tab } from "@ya.praktikum/react-developer-burger-ui-components"
import React, { useCallback, useEffect } from "react"
import styles from './burger-ingredients.module.scss'
import { BurgerIngredientTab } from './burger-ingredient-tab/burger-ingredient-tab'
import Modal from "../modals/modal/modal"
import useModal from "../../hooks/use-modal"
import { IngredientDetails } from "../modals/ingredient-details/ingredient-details"
import { BurgerIngredient } from "../../models"

export const BurgerIngredients = (props: { data: BurgerIngredient[] }) => {
  const [current, setCurrent] = React.useState<string>('buns');
  const [currentItem, setCurrentItem] = React.useState<BurgerIngredient | null>(null);
  const { isOpen, toggle } = useModal();

  const selectItem = useCallback((item: BurgerIngredient) => {
    setCurrentItem(item);
    toggle();
  }, [setCurrentItem, toggle]);

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
          <BurgerIngredientTab key={x.name} items={props.data.filter(c => c.type === x.type)} name={x.name} onSelect={selectItem} />
        ))}        
      </div>
      <Modal wrapperId="item-modal" isOpen={isOpen} title="Детали ингредиета" toggle={toggle}>
        { currentItem && <IngredientDetails item={currentItem} /> }
      </Modal>
    </div>
  )
}
