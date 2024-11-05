import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { ingredientsSlice } from "./ingredients/reducer";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { orderSlice } from "./orders/reducer";

const rootReducer = combineSlices(ingredientsSlice, orderSlice);

const store = configureStore({
  reducer: rootReducer,
})

export const createStore = () => {
  return store;
}

export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
