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
  ingredientsMap: { [x: string]: BurgerIngredient };
}

export type IngredientsRequestResult = {
  data: BurgerIngredient[]
} & ApiResponse

export type Order = {
  name: string;
  order: OrderData;
} & ApiResponse

export type OrderData = {
  number: number;
  name?: string;
  createdAt: string;
  updatedAt: string;
  status: string;
  _id: string;
  price?: number;
  ingredients: string[]
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

export type ApiResponse = {
  success: boolean;
}

export type AuthResponse = {
  accessToken: string;
  refreshToken: string;
  user: UserData;
} & ApiResponse

export type UserData = {
  email: string;
  name: string;
}

export type GetUserResponse = {
  user: UserData;
} & ApiResponse

export type AuthState = {
  user: UserData | null;
  isLoading: boolean;
  isInitialized: boolean;
}

export type LoginData = {
  email: string;
  password: string;
}

export type UserFullData = {
  password: string
} & UserData

export type ResetPasswordData = {
  password: string;
  token: string;
}

export type FeedState = {
  orders: OrderData[],
  total: number,
  totalToday: number
}

export type OrdersHistoryState = {
  historyOrders: OrderData[],
  historyTotal: number,
  historyTotalToday: number
}

export type OrderProps = {
  item: OrderData;
  path: string;
}

export type OrderResponse = {
  orders: OrderData[];
}
