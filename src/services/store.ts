import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { ingredientsSlice } from "./ingredients/reducer";
import { useDispatch } from "react-redux";
import { orderSlice } from "./orders/reducer";

const rootReducer = combineSlices(ingredientsSlice, orderSlice);

const store = configureStore({
  reducer: rootReducer,
})

export const createStore = () => {
  return store;
}

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
