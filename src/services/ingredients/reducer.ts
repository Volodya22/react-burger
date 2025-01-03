import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { IngredientsState, BurgerIngredient, ConstructorBurgerIngredient, MoveItemInfo } from "../../models";
import { getIngredients } from "./actions";

const initialState: IngredientsState = {
  ingredients: [],
  constructorIngredients: {
    bun: null,
    ingredients: []
  },
  selectedIngredient: null,
  isLoading: false,
  ingredientsMap: {}
}

export const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {
    selectIngredient: (state, action: PayloadAction<BurgerIngredient | null>) => {
      state.selectedIngredient = action.payload;
    },
    addIngredient: {
      reducer(state, action: PayloadAction<{ id: string, itemId: string }>) {
        const item = state.ingredients.find(x => x._id === action.payload.id);

        if (!item) {
          return;
        }

        const itemId = action.payload.itemId;
        const constructorItem = { ...item, itemId };

        if (item.type === 'bun') {
          state.constructorIngredients.bun = constructorItem;
        } else {
          state.constructorIngredients.ingredients.push(constructorItem);
        }
      },
      prepare(payload: { id: string }) {
        return { payload: { id: payload.id, itemId: nanoid() } }
      }
    },
    deleteIngredient: (state, action: PayloadAction<ConstructorBurgerIngredient>) => {
      state.constructorIngredients.ingredients = state.constructorIngredients.ingredients.filter(x => x.itemId !== action.payload.itemId);
    },
    moveIngredient: (state, action: PayloadAction<MoveItemInfo>) => {
      const temp = state.constructorIngredients.ingredients[action.payload.fromIndex];
      state.constructorIngredients.ingredients[action.payload.fromIndex] = state.constructorIngredients.ingredients[action.payload.toIndex];
      state.constructorIngredients.ingredients[action.payload.toIndex] = temp;
    },
    clearConstructor: (state) => {
      state.constructorIngredients = {
        bun: null,
        ingredients: []
      };
    }
  },
  selectors: {
    getAllIngredients: state => state.ingredients,
    getSelectedItem: state => state.selectedIngredient,
    getBun: state => state.constructorIngredients.bun,
    getConstructorIngredients: state => state.constructorIngredients.ingredients,
    getConstructorData: state => state.constructorIngredients,
    isDataLoading: state => state.isLoading,
    getOrderItemIds: state => state.constructorIngredients.bun
      ? [state.constructorIngredients.bun._id, ...state.constructorIngredients.ingredients.map(x => x._id), state.constructorIngredients.bun!._id]
      : state.constructorIngredients.ingredients.map(x => x._id),
    getIngredientsMap: state => state.ingredientsMap
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.ingredients = action.payload;
        state.ingredientsMap = Object.assign({}, ...action.payload.map((x) => ({[x._id]: x})));
        state.isLoading = false;
      })
      .addCase(getIngredients.rejected, (state) => {
        state.isLoading = false;
      })
  }
})

export const { getAllIngredients, getSelectedItem, getBun, getConstructorIngredients, getConstructorData, isDataLoading, getOrderItemIds, getIngredientsMap } = ingredientsSlice.selectors;

export const { selectIngredient, addIngredient, deleteIngredient, clearConstructor, moveIngredient } = ingredientsSlice.actions;
