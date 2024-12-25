import { Tab } from "@ya.praktikum/react-developer-burger-ui-components"
import React, { useCallback, useRef } from "react"
import styles from './burger-ingredients.module.scss'
import { BurgerIngredientTab } from './burger-ingredient-tab/burger-ingredient-tab'
import { IngredientTab } from "../../models"
import { getAllIngredients, isDataLoading } from "../../services/ingredients/reducer"
import { useAppSelector } from "../../services/store"

export const BurgerIngredients = () => {
  const data = useAppSelector(getAllIngredients);
  const isLoading = useAppSelector(isDataLoading);

  const tabsHeaderRef = useRef<HTMLDivElement>(null);
  const tabsRefs = [useRef<HTMLHeadingElement>(null), useRef<HTMLHeadingElement>(null), useRef<HTMLHeadingElement>(null)]

  const [current, setCurrent] = React.useState<string>('buns');

  const onScroll = useCallback(() => {
    if (!tabsHeaderRef.current && tabsRefs.some(x => !x.current)) {
      return;
    }

    const headerBottom = tabsHeaderRef.current!.getBoundingClientRect().bottom;
    const tabsData = tabsRefs.map(x => Math.abs(headerBottom - x.current!.getBoundingClientRect().top));

    setCurrent(groups[tabsData.indexOf(Math.min(...tabsData))].tabType);
  }, [data])

  const groups: IngredientTab[] = [{
    name: "Булки",
    type: "bun",
    tabType: "buns"
  }, {
    name: "Соусы",
    type: "sauce",
    tabType: "sauces"
  }, {
    name: "Начинки",
    type: "main",
    tabType: "fillings"
  }];

  if (isLoading) {
    return (<p>Загрузка...</p>)
  }

  return (
    <div className={styles.ingredientContainer}>
      <div className={styles.header}>
        <p className="text text_type_main-large">Соберите бургер</p>
      </div>
      <div className={styles.tabContainer} ref={tabsHeaderRef}>
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
      <div className={styles.tab} onScroll={onScroll}>
        { data && data.length > 0 && groups.map((x, index) => (
          <BurgerIngredientTab key={x.name} items={data.filter(c => c.type === x.type)} name={x.name} innerRef={tabsRefs[index]} />
        ))}
      </div>
    </div>
  )
};
