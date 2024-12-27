import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUser, login, logout, register, updateUser } from "../../utils/api";
import { LoginData, UserFullData } from "../../models";

export const loginAction = createAsyncThunk("auth/login", async (data: LoginData) => { return await login(data) })

export const logoutAction = createAsyncThunk("auth/logout", async (token: string) => { return await logout(token) })

export const registerAction = createAsyncThunk("auth/register", async (data: UserFullData) => { return await register(data) })

export const getUserAction = createAsyncThunk("auth/getUser", async () => { return await getUser() })

export const updateUserAction = createAsyncThunk("auth/updateUser", async (data: UserFullData) => { return await updateUser(data) })
