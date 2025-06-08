import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getIngredientsApi,
  getFeedsApi,
  getOrdersApi,
  orderBurgerApi,
  getOrderByNumberApi,
  registerUserApi,
  loginUserApi,
  forgotPasswordApi,
  resetPasswordApi,
  getUserApi,
  updateUserApi,
  logoutApi
} from '@api';
import { clearUserInfo } from '../slices/userSlice';
import { TRegisterData, TLoginData } from '@api';
import { getCookie, setCookie } from '../utils/cookie';
import { checkAuthTrue } from '../slices/userSlice';

function setAccessAndRefreshToken(accessToken: string, refreshToken: string) {
  setCookie('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
}

export const getIngredients = createAsyncThunk(
  'getIngredients',
  async () => await getIngredientsApi()
);

export const getFeeds = createAsyncThunk(
  'getFeeds',
  async () => await getFeedsApi()
);

export const getOrders = createAsyncThunk(
  'getOrders',
  async () => await getOrdersApi()
);

export const postOrder = createAsyncThunk(
  'postOrder',
  async (data: string[]) => await orderBurgerApi(data)
);

export const getOrderByNumber = createAsyncThunk(
  'getOrderByNumber',
  async (number: number) => await getOrderByNumberApi(number)
);

export const registerUser = createAsyncThunk(
  'registerUser',
  async (data: TRegisterData) =>
    await registerUserApi(data).then((data) => {
      setAccessAndRefreshToken(data.accessToken, data.refreshToken);
      return data;
    })
);

export const loginUser = createAsyncThunk(
  'loginUser',
  async (data: TLoginData) =>
    await loginUserApi(data).then((data) => {
      setAccessAndRefreshToken(data.accessToken, data.refreshToken);
      return data;
    })
);

export const forgotPassword = createAsyncThunk(
  'forgotPassword',
  async (data: { email: string }) => await forgotPasswordApi(data)
);

export const resetPassword = createAsyncThunk(
  'resetPassword',
  async (data: { password: string; token: string }) =>
    await resetPasswordApi(data)
);

export const getUser = createAsyncThunk(
  'getUser',
  async () => await getUserApi()
);

export const updateUser = createAsyncThunk(
  'updateUser',
  async (user: Partial<TRegisterData>) => await updateUserApi(user)
);

export const logout = createAsyncThunk(
  'logout',
  async (_, { dispatch }) =>
    await logoutApi().then(() => {
      localStorage.removeItem('refreshToken');
      setCookie('accessToken', '', { expires: -1 });
      dispatch(clearUserInfo());
    })
);

export const checkIsAuth = createAsyncThunk(
  'checkIsAuth',
  async (_, { dispatch }) => {
    if (getCookie('accessToken')) {
      dispatch(getUser()).finally(() => {
        dispatch(checkAuthTrue());
      });
    } else {
      dispatch(checkAuthTrue());
    }
  }
);
