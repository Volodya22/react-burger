import { ConstructorElement, DragIcon, CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components"
import bunImg from '../../images/bun.png'
import sauceImg from '../../images/sauce.png'
import meatImg from '../../images/meat.png'
import spImg from '../../images/sp.png'
import ringsImg from '../../images/rings.png'
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
            thumbnail={bunImg}
          />
        </div>
        <div className={styles.item}>
          <DragIcon className="pr-2" type="primary" />
          <ConstructorElement
            text="Соус традиционный галактический"
            price={30}
            thumbnail={sauceImg}
          />
        </div>
        <div className={styles.item}>
          <DragIcon className="pr-2" type="primary" />
          <ConstructorElement
            text="Мясо бессмертных моллюсков Protostomia"
            price={300}
            thumbnail={meatImg}
          />
        </div>
        <div className={styles.item}>
          <DragIcon className="pr-2" type="primary" />
          <ConstructorElement
            text="Плоды Фалленианского дерева"
            price={80}
            thumbnail={spImg}
          />
        </div>
        <div className={styles.item}>
          <DragIcon className="pr-2" type="primary" />
          <ConstructorElement
            text="Хрустящие минеральные кольца"
            price={80}
            thumbnail={ringsImg}
          />
        </div>
        <div className={styles.item}>
          <DragIcon className="pr-2" type="primary" />
          <ConstructorElement
            text="Хрустящие минеральные кольца"
            price={80}
            thumbnail={ringsImg}
          />
        </div>
        <div className="ml-8">
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text="Краторная булка N-200i (низ)"
            price={200}
            thumbnail={bunImg}
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
