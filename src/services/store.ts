import { combineSlices, configureStore, Tuple } from "@reduxjs/toolkit";
import { ingredientsSlice } from "./ingredients/reducer";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { orderSlice } from "./orders/reducer";
import { authSlice } from "./auth/reducer";
import { socketMiddleware } from "./middleware/socket-middleware";
import { feedSlice, setFeedData } from "./feed/reducer";
import { ordersHistorySlice, setOrdersHistoryData } from "./orders-history/reducer";
import { feedConnect, feedDisconnect } from "./feed/actions";
import { ordersHistoryConnect, ordersHistoryDisconnect } from "./orders-history/actions";

export const WebSocketUrl = 'wss://norma.nomoreparties.space/orders';

const rootReducer = combineSlices(ingredientsSlice, orderSlice, authSlice, feedSlice, ordersHistorySlice);

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      socketMiddleware(`${WebSocketUrl}/all`, feedConnect, feedDisconnect, setFeedData),
      socketMiddleware(WebSocketUrl, ordersHistoryConnect, ordersHistoryDisconnect, setOrdersHistoryData)
    )
})

export const createStore = () => {
  return store;
}

export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
