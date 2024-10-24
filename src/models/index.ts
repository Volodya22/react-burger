import { ReactNode } from "react"

export type ReactPortalProps = {
  children?: ReactNode,
  wrapperId: string
}

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

export type BurgerIngredientTabProps = {
  items: BurgerIngredient[];
  name: string;
  onSelect: (item: BurgerIngredient) => void;
}

export type BurgerIngredientItemProps = {
  item: BurgerIngredient;
  onClick: () => void;
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
};
