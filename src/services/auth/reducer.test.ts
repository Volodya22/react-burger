import { ApiResponse, AuthResponse, AuthState, GetUserResponse, LoginData, UserFullData } from "../../models"
import { loginDataMock, userFullDataMock } from "../mockData"
import { getUserAction, loginAction, logoutAction, registerAction, updateUserAction } from "./actions"
import { AccessTokenKey, appInitialized, authSlice, RefreshTokenKey } from "./reducer"

const initialState: AuthState = {
  user: null,
  isLoading: false,
  isInitialized: false
}

const filledState: AuthState = {
  user: {
    email: "test",
    name: "test1"
  },
  isInitialized: true,
  isLoading: false
}

describe('Тесты для authSlice', () => {
  beforeAll(() => {
    const localStorageMock: Storage = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      clear: jest.fn(),
      key: jest.fn(),
      length: 0,
      removeItem: jest.fn()
    };
    global.localStorage = localStorageMock
  })

  test('Тест экшена appInitialized', () => {
    const changedState = authSlice.reducer(initialState, appInitialized())

    expect(changedState.isInitialized).toBe(true)
  })

  test('Тест экшена loginAction.pending', () => {
    const changedState = authSlice.reducer(initialState, loginAction.pending('', loginDataMock))

    expect(changedState.isLoading).toBe(true)
  })

  test('Тест экшена loginAction.fulfilled', () => {
    const payload: AuthResponse = {
      accessToken: "1",
      refreshToken: "2",
      success: true,
      user: {
        email: loginDataMock.email,
        name: "test"
      }
    }
    const changedState = authSlice.reducer({ ...initialState, isLoading: true }, loginAction.fulfilled(payload, '', loginDataMock))

    expect(changedState.user).toEqual(payload.user)
    expect(changedState.isLoading).toBe(false)
    expect(localStorage.setItem).toHaveBeenCalledWith(AccessTokenKey, payload.accessToken)
    expect(localStorage.setItem).toHaveBeenCalledWith(RefreshTokenKey, payload.refreshToken)
  })

  test('Тест экшена loginAction.rejected', () => {
    const changedState = authSlice.reducer({ ...initialState, isLoading: true }, loginAction.rejected(new Error('error'), 'тестовая ошибка', loginDataMock))

    expect(changedState.isLoading).toBe(false)
  })

  test('Тест экшена logoutAction.pending', () => {
    const changedState = authSlice.reducer(filledState, logoutAction.pending('', ''))

    expect(changedState.isLoading).toBe(true)
  })

  test('Тест экшена logoutAction.fulfilled', () => {
    const payload: ApiResponse = {
      success: true
    }
    const changedState = authSlice.reducer({ ...filledState, isLoading: true }, logoutAction.fulfilled(payload, '', ''))

    expect(changedState.user).toBeNull()
    expect(changedState.isLoading).toBe(false)
    expect(localStorage.removeItem).toHaveBeenCalledWith(AccessTokenKey)
    expect(localStorage.removeItem).toHaveBeenCalledWith(RefreshTokenKey)
  })

  test('Тест экшена logoutAction.rejected', () => {
    const changedState = authSlice.reducer({ ...filledState, isLoading: true }, logoutAction.rejected(new Error('error'), 'тестовая ошибка', ''))

    expect(changedState.isLoading).toBe(false)
  })

  test('Тест экшена registerAction.pending', () => {
    const changedState = authSlice.reducer(initialState, registerAction.pending('', userFullDataMock))

    expect(changedState.isLoading).toBe(true)
  })

  test('Тест экшена registerAction.fulfilled', () => {
    const payload: AuthResponse = {
      accessToken: "1",
      refreshToken: "2",
      success: true,
      user: {
        email: loginDataMock.email,
        name: "test"
      }
    }
    const changedState = authSlice.reducer({ ...initialState, isLoading: true }, registerAction.fulfilled(payload, '', userFullDataMock))

    expect(changedState.user).toEqual(payload.user)
    expect(changedState.isLoading).toBe(false)
    expect(localStorage.setItem).toHaveBeenCalledWith(AccessTokenKey, payload.accessToken)
    expect(localStorage.setItem).toHaveBeenCalledWith(RefreshTokenKey, payload.refreshToken)
  })

  test('Тест экшена registerAction.rejected', () => {
    const changedState = authSlice.reducer({ ...initialState, isLoading: true }, registerAction.rejected(new Error('error'), 'тестовая ошибка', userFullDataMock))

    expect(changedState.isLoading).toBe(false)
  })

  test('Тест экшена getUserAction.pending', () => {
    const changedState = authSlice.reducer(initialState, getUserAction.pending(''))

    expect(changedState.isLoading).toBe(true)
  })

  test('Тест экшена getUserAction.fulfilled', () => {
    const payload: GetUserResponse = {
      success: true,
      user: {
        email: loginDataMock.email,
        name: "test"
      }
    }
    const changedState = authSlice.reducer({ ...initialState, isLoading: true }, getUserAction.fulfilled(payload, ''))

    expect(changedState.user).toEqual(payload.user)
    expect(changedState.isLoading).toBe(false)
  })

  test('Тест экшена getUserAction.rejected', () => {
    const changedState = authSlice.reducer({ ...initialState, isLoading: true }, getUserAction.rejected(new Error('error'), 'тестовая ошибка'))

    expect(changedState.isLoading).toBe(false)
  })

  test('Тест экшена updateUserAction.pending', () => {
    const changedState = authSlice.reducer(initialState, updateUserAction.pending('', userFullDataMock))

    expect(changedState.isLoading).toBe(true)
  })

  test('Тест экшена updateUserAction.fulfilled', () => {
    const payload: GetUserResponse = {
      success: true,
      user: {
        email: loginDataMock.email,
        name: "test"
      }
    }
    const changedState = authSlice.reducer({ ...initialState, isLoading: true }, updateUserAction.fulfilled(payload, '', userFullDataMock))

    expect(changedState.user).toEqual(payload.user)
    expect(changedState.isLoading).toBe(false)
  })

  test('Тест экшена updateUserAction.rejected', () => {
    const changedState = authSlice.reducer({ ...initialState, isLoading: true }, updateUserAction.rejected(new Error('error'), 'тестовая ошибка', userFullDataMock))

    expect(changedState.isLoading).toBe(false)
  })
})
