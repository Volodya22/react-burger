import { ConstructorElement, DragIcon, CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components"
import img from '../../app/assets/bun.png'
import styles from './burger-constructor.module.scss'

export const BurgerConstructor = () => {
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: 100 }}>
        <div className="ml-8">
          <ConstructorElement
            type="top"
            isLocked={true}
            text="Краторная булка N-200i (верх)"
            price={200}
            thumbnail={img}
          />
        </div>
        <div className={styles.item}>
          <DragIcon className="pr-2" type="primary" />
          <ConstructorElement
            text="Краторная булка N-200i (верх)"
            price={50}
            thumbnail={img}
          />
        </div>
        <div className={styles.item}>
          <DragIcon className="pr-2" type="primary" />
          <ConstructorElement
            text="Краторная булка N-200i (верх)"
            price={50}
            thumbnail={img}
          />
        </div>
        <div className="ml-8">
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text="Краторная булка N-200i (низ)"
            price={200}
            thumbnail={img}
          />
        </div>
      </div>
      <div className={styles.price}>
        <div className={styles.priceValue}>
          <p className="text text_type_digits-medium pr-2">610</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button htmlType="button" type="primary" size="large">
          Нажми на меня
        </Button>
      </div>
    </>
  )
}
