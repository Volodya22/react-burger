import { ActionCreatorWithoutPayload, ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { Middleware } from "redux";
import { AccessTokenKey } from "../auth/reducer";
import { refreshToken } from "../../utils/api";

export const socketMiddleware = <T>(
  wsUrl: string,
  connectAction: ActionCreatorWithoutPayload,
  disconnectAction: ActionCreatorWithoutPayload,
  setData: ActionCreatorWithPayload<T>
): Middleware => {
  return (store) => {
    let socket: WebSocket | null = null;

    return (next) => (action: any) => {
      const { dispatch } = store

      if (connectAction.match(action) && (!socket || socket.readyState === WebSocket.CLOSED)) {
        const token = localStorage.getItem(AccessTokenKey)!.replace('Bearer ', '')
        const url = `${wsUrl}?token=${token}`

        socket = new WebSocket(url)

        socket.onmessage = async (event) => {
          const data = JSON.parse(event.data)

          if (data.success) {
            dispatch(setData(data))
          }
        }

        socket.onopen = () => {
          console.log('Соединение установлено')
        };

        socket.onclose = () => {
          console.log('Соединение закрыто')
        };

        socket.onerror = (error) => {
          console.error('Ошибка сокета:', error)
        };
      }

      if (disconnectAction.match(action) && socket) {
        socket.close()
        socket = null
      }

      return next(action)
    }
  }
}
