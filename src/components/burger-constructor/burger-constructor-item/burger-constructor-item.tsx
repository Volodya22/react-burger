import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import { ConstructorBurgerIngredient } from "../../../models"
import styles from './burger-constructor-item.module.scss'
import { useAppDispatch } from "../../../services/store"
import { deleteIngredient, moveIngredient } from "../../../services/ingredients/reducer"
import { useRef } from "react"
import { useDrag, useDrop, XYCoord } from "react-dnd"
import { ItemTypes } from "../../../utils/item-types"

interface DragItem {
  index: number
  id: string
  type: string
}

export const BurgerConstructorItem = (props: { item: ConstructorBurgerIngredient, index: number }) => {
  const index = props.index;

  const dispatch = useAppDispatch();
  const ref = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop<DragItem, void, {}>({
    accept: ItemTypes.ConstructorItem,
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return
      }
      
      const dragIndex = item.index
      const hoverIndex = index

      if (dragIndex === hoverIndex) {
        return
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      dispatch(moveIngredient({ fromIndex: dragIndex, toIndex: hoverIndex }));

      item.index = hoverIndex
    },
  })

  const [, drag] = useDrag({
    type: ItemTypes.ConstructorItem,
    item: () => {
      return { id: props.item._id, index: props.index }
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  drag(drop(ref))

  const onDelete = (item: ConstructorBurgerIngredient) => {
    dispatch(deleteIngredient(item));
  }

  return (
    <div key={props.item.itemId} className={styles.item} ref={ref}>
      <DragIcon className="pr-2" type="primary" />
      <ConstructorElement
        text={props.item.name}
        price={props.item.price}
        thumbnail={props.item.image}
        handleClose={() => onDelete(props.item)}
      />
    </div>
  )
}
