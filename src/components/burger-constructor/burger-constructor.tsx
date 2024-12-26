import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components"
import styles from './burger-constructor.module.scss'
import { BurgerConstructorTotal } from "./burger-constructor-total/burger-constructor-total"
import Modal from "../modals/modal/modal"
import { OrderDetails } from "../modals/order-details/order-details"
import { addIngredient, clearConstructor, getBun, getConstructorIngredients } from "../../services/ingredients/reducer"
import { useDrop } from "react-dnd"
import { useAppDispatch, useAppSelector } from "../../services/store"
import { clearOrder, getOrder } from "../../services/orders/reducer"
import { BurgerConstructorItem } from "./burger-constructor-item/burger-constructor-item"
import { ItemTypes } from "../../utils/item-types"

export const BurgerConstructor = () => {
  const bun = useAppSelector(getBun);
  const ingredients = useAppSelector(getConstructorIngredients);
  const order = useAppSelector(getOrder);
  const dispatch = useAppDispatch();

  const [, dropTarget] = useDrop({
    accept: ItemTypes.Ingredient,
    drop(itemId: { id: string }) {
      dispatch(addIngredient(itemId));
    }
  });

  const toggle = () => {
    dispatch(clearConstructor());
    dispatch(clearOrder());
  }
  
  return (
    <div className="ml-4">
      <div className={styles.constructorContainer} ref={dropTarget}>
        <div className="ml-8">
          {
            bun ? (
              <ConstructorElement
                type="top"
                isLocked={true}
                text={`${bun.name} (верх)`}
                price={bun.price}
                thumbnail={bun.image}
              />
            ) : (
              <div className={styles.emptyBunTop}>
                <p className={styles.centered}>Добавьте булочку</p>
              </div>
            )
          }
        </div>
        <div className={styles.items}>
        {
          ingredients && ingredients.length > 0 ? ingredients.map((x, index) => (
            <BurgerConstructorItem item={x} index={index} key={x.itemId} />
          )) : (
            <div className={styles.emtpyIngredient}>
              <p className={styles.centered}>Добавьте ингредиент</p>
            </div>
          )
        }
        </div>
        <div className="ml-8">
        {
            bun ? (
              <ConstructorElement
                type="bottom"
                isLocked={true}
                text={`${bun.name} (низ)`}
                price={bun.price}
                thumbnail={bun.image}
              />
            ) : (
              <div className={styles.emptyBunBottom}>
                <p className={styles.centered}>Добавьте булочку</p>
              </div>
            )
          }
        </div>
      </div>
      <BurgerConstructorTotal />
      {
        order &&
        <Modal wrapperId="modals" toggle={toggle}>
          <OrderDetails />
        </Modal>
      }
    </div>
  )
};
