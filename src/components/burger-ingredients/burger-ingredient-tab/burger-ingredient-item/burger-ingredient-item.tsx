import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import styles from './burger-ingredient-item.module.scss'
import { BurgerIngredientItemProps } from "../../../../models";
import { useDrag } from "react-dnd";
import { useAppDispatch } from "../../../../services/store";
import { useCallback } from "react";
import { getOrderItemIds, selectIngredient } from "../../../../services/ingredients/reducer";
import { shallowEqual, useSelector } from "react-redux";

export const BurgerIngredientItem = (props: BurgerIngredientItemProps) => {
  const itemIds = useSelector(getOrderItemIds, shallowEqual);

  const dispatch = useAppDispatch();
  const { _id: id  } = props.item;
  const [, dragRef] = useDrag(() => ({
    type: "item",
    item: { id }
  }));

  const handleClick = useCallback(() => {
    dispatch(selectIngredient(props.item))
  }, [props.item])

  return (
    <div className={styles.itemContainer} onClick={handleClick} ref={dragRef}>
      <div className={styles.imageContainer}>
        <img src={props.item.image} alt={props.item.name} />
      </div>
      <div className={styles.price}>
        <span className="text text_type_main-default mr-2">{props.item.price}</span>
        <CurrencyIcon type="primary" />
      </div>
      <div className={styles.name}>
        <p className={styles.nameText}>{props.item.name}</p>
      </div>
      { itemIds.some(x => x === props.item._id) && <Counter count={itemIds.filter(x => x === props.item._id).length} size="default" extraClass="m-1" /> }
    </div>
  );
};
