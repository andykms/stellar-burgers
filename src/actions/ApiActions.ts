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
import { TRegisterData, TLoginData } from '@api';
import { getCookie, setCookie } from '../utils/cookie';
import { useDispatch } from '../services/store'
import { authChecked } from '../slices/userSlice';

function setAccessAndRefreshToken(accessToken: string, refreshToken: string) {
  setCookie('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
}

export const getIngredients = createAsyncThunk(
  'burger/getIngredients',
  async () => await getIngredientsApi()
);

export const getFeeds = createAsyncThunk(
  'burger/getFeeds',
  async () => await getFeedsApi()
);

export const getOrders = createAsyncThunk(
  'burger/getOrders',
  async () => await getOrdersApi()
);

export const postOrder = createAsyncThunk(
  'burger/postOrder',
  async (data: string[]) => await orderBurgerApi(data)
);

export const getOrderByNumber = createAsyncThunk(
  'burger/getOrderByNumber',
  async (number: number) => await getOrderByNumberApi(number)
);

export const registerUser = createAsyncThunk(
  'burger/registerUser',
  async (data: TRegisterData) =>
    await registerUserApi(data).then((data) => {
      setAccessAndRefreshToken(data.accessToken, data.refreshToken);
      return data;
    })
);

export const loginUser = createAsyncThunk(
  'burger/loginUser',
  async (data: TLoginData) =>
    await loginUserApi(data).then((data) => {
      setAccessAndRefreshToken(data.accessToken, data.refreshToken);
      return data;
    })
);

export const forgotPassword = createAsyncThunk(
  'burger/forgotPassword',
  async (data: { email: string }) => await forgotPasswordApi(data)
);

export const resetPassword = createAsyncThunk(
  'burger/resetPassword',
  async (data: { password: string; token: string }) =>
    await resetPasswordApi(data)
);

export const getUser = createAsyncThunk(
  'burger/getUser',
  async () => await getUserApi()
);

export const updateUser = createAsyncThunk(
  'burger/updateUser',
  async (user: Partial<TRegisterData>) => await updateUserApi(user)
);

export const logout = createAsyncThunk(
  'burger/logout',
  async () =>
    await logoutApi().then(() => {
      localStorage.removeItem('refreshToken');
      setCookie('accessToken', '', { expires: -1 });
    })
);

export const checkIsAuth = createAsyncThunk('burger/checkIsAuth', async () => {
  const dispatch = useDispatch();
  if (getCookie('accessToken')) {
    dispatch(getUser()).finally(() => {
      dispatch(authChecked());
    });
  } else {
    dispatch(authChecked());
  }
});
