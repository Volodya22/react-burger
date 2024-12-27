import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "../../models";
import { getUserAction, loginAction, logoutAction, registerAction, updateUserAction } from "./actions";

export const AccessTokenKey: string = 'accessToken'
export const RefreshTokenKey: string = 'refreshToken'

const initialState: AuthState = {
  user: null,
  isLoading: false,
  isInitialized: false
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    appInitialized: (state) => {
      state.isInitialized = true
    }
  },
  selectors: {
    userData: state => state.user,
    isUserDataLoading: state => state.isLoading,
    isAppInitialized: state => state.isInitialized
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAction.pending, (state) => {
        state.isLoading = true
      })
      .addCase(loginAction.rejected, (state, action) => {
        state.isLoading = false
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        localStorage.setItem(AccessTokenKey, action.payload.accessToken)
        localStorage.setItem(RefreshTokenKey, action.payload.refreshToken)
        
        state.user = action.payload.user
        state.isLoading = false
      })
      .addCase(logoutAction.pending, (state) => {
        state.isLoading = true
      })
      .addCase(logoutAction.rejected, (state) => {
        state.isLoading = false
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.user = null;
        state.isLoading = false

        localStorage.removeItem(AccessTokenKey)
        localStorage.removeItem(RefreshTokenKey)
      })
      .addCase(registerAction.pending, (state) => {
        state.isLoading = true
      })
      .addCase(registerAction.rejected, (state) => {
        state.isLoading = false
      })
      .addCase(registerAction.fulfilled, (state, action) => {
        state.user = action.payload.user
        state.isLoading = false

        localStorage.setItem(AccessTokenKey, action.payload.accessToken)
        localStorage.setItem(RefreshTokenKey, action.payload.refreshToken)
      })
      .addCase(getUserAction.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getUserAction.rejected, (state) => {
        state.isLoading = false
      })
      .addCase(getUserAction.fulfilled, (state, action) => {
        state.user = action.payload.user
        state.isLoading = false
      })
      .addCase(updateUserAction.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateUserAction.rejected, (state) => {
        state.isLoading = false
      })
      .addCase(updateUserAction.fulfilled, (state, action) => {
        state.user = action.payload.user
        state.isLoading = false
      })
  }
})

export const { userData, isUserDataLoading, isAppInitialized } = authSlice.selectors
export const { appInitialized } = authSlice.actions
