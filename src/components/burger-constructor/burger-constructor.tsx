import { ConstructorElement, DragIcon, CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components"
import bunImg from '../../images/bun.png'
import styles from './burger-constructor.module.scss'
import { BurgerConstructorTotal } from "./burger-constructor-total/burger-constructor-total"
import Modal from "../modals/modal/modal"
import useModal from "../../hooks/use-modal"
import { BurgerConstructorModal } from "./burger-constructor-modal/burger-constructor-modal"

export const BurgerConstructor = (props: any) => {
  const { isOpen, toggle } = useModal(); 
  
  return (
    <div style={{ marginLeft: 16 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: 100 }}>
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
          props.data && props.data.length > 0 && props.data.map((x: any) => (
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
      <Modal wrapperId="order-modal" isOpen={isOpen} toggle={toggle}>
        <BurgerConstructorModal />
      </Modal>
    </div>
  )
}
