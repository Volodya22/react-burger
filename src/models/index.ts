import { ReactNode, RefObject } from "react"

export type ReactPortalProps = {
  children?: ReactNode,
  wrapperId: string
}

export type ModalProps = {
  toggle: () => void
} & ReactPortalProps

export type BurgerIngredient = {
  calories: number;
  carbohydrates: number;
  fat: number;
  image: string;
  image_large: string;
  image_mobile: string;
  name: string;
  price: number;
  proteins: number;
  type: string;
  __v: number;
  _id: string;
}

export type ConstructorBurgerIngredient = {
  itemId: string;
} & BurgerIngredient

export type BurgerIngredientTabProps = {
  items: BurgerIngredient[];
  name: string;
  innerRef: RefObject<HTMLHeadingElement>;
}

export type BurgerIngredientItemProps = {
  item: BurgerIngredient;
}

export type ModalOverlayProps = {
  children?: ReactNode;
  onClick: () => void;
}

export type IngredientDetailsInfoProps = {
  type: string;
  value: number;
}

export type IngredientTab = {
  name: string;
  type: string;
  tabType: string;
}

export type IngredientsState = {
  ingredients: BurgerIngredient[],
  constructorIngredients: {
    bun: ConstructorBurgerIngredient | null,
    ingredients: ConstructorBurgerIngredient[]
  },
  selectedIngredient: BurgerIngredient | null,
  isLoading: boolean;
}

export type Order = {
  name: string;
  order: OrderData;
  success: boolean;
}

export type OrderData = {
  number: number;
}

export type OrderRequest = {
  ingredients: string[]
}

export type OrderState = {
  order: Order | null;
  isLoading: boolean;
}

export type MoveItemInfo = {
  fromIndex: number;
  toIndex: number;
}
