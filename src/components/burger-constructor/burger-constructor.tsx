import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import styles from './burger-constructor.module.scss'
import { BurgerConstructorTotal } from "./burger-constructor-total/burger-constructor-total"
import Modal from "../modals/modal/modal"
import { OrderDetails } from "../modals/order-details/order-details"
import { useSelector } from "react-redux"
import { addIngredient, clearConstructor, deleteIngredient, getBun, getConstructorIngredients } from "../../services/ingredients/reducer"
import { useDrop } from "react-dnd"
import { useAppDispatch } from "../../services/store"
import { clearOrder, getOrder } from "../../services/orders/reducer"
import { ConstructorBurgerIngredient } from "../../models"

export const BurgerConstructor = () => {
  const bun = useSelector(getBun);
  const ingredients = useSelector(getConstructorIngredients);
  const order = useSelector(getOrder);
  const dispatch = useAppDispatch();

  const [, dropTarget] = useDrop({
    accept: "item",
    drop(itemId: { id: string }) {
      dispatch(addIngredient(itemId));
    }
  });

  const toggle = () => {
    dispatch(clearConstructor());
    dispatch(clearOrder());
  }

  const onDelete = (item: ConstructorBurgerIngredient) => {
    dispatch(deleteIngredient(item));
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
                text={bun.name}
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
          ingredients && ingredients.length > 0 ? ingredients.map(x => (
            <div key={x.itemId} className={styles.item}>
              <DragIcon className="pr-2" type="primary" />
              <ConstructorElement
                text={x.name}
                price={x.price}
                thumbnail={x.image}
                handleClose={() => onDelete(x)}
              />
            </div>
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
                text={bun.name}
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
