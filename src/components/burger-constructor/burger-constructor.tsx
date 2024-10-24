import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import bunImg from '../../images/bun.png'
import styles from './burger-constructor.module.scss'
import { BurgerConstructorTotal } from "./burger-constructor-total/burger-constructor-total"
import Modal from "../modals/modal/modal"
import useModal from "../../hooks/use-modal"
import { OrderDetails } from "../modals/order-details/order-details"
import { BurgerIngredient } from "../../models"

export const BurgerConstructor = (props: { data: BurgerIngredient[] }) => {
  const { isOpen, toggle } = useModal(); 
  
  return (
    <div className="ml-4">
      <div className={styles.constructorContainer}>
        <div className="ml-8 mr-4">
          <ConstructorElement
            type="top"
            isLocked={true}
            text="Краторная булка N-200i (верх)"
            price={200}
            thumbnail={bunImg}
          />
        </div>
        <div className={styles.items}>
        {
          props.data && props.data.length > 0 && props.data.map(x => (
            <div key={x._id} className={styles.item}>
              <DragIcon className="pr-2" type="primary" />
              <ConstructorElement
                text={x.name}
                price={x.price}
                thumbnail={x.image}
              />
            </div>
          ))
        }
        </div>        
        <div className="ml-8 mr-4">
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text="Краторная булка N-200i (низ)"
            price={200}
            thumbnail={bunImg}
          />
        </div>
      </div>
      <BurgerConstructorTotal onClick={toggle} />
      <Modal wrapperId="modals" isOpen={isOpen} toggle={toggle}>
        <OrderDetails />
      </Modal>
    </div>
  )
};
