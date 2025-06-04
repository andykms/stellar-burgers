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
  logoutApi,
} from '@api';
import { TRegisterData, TLoginData } from '@api';
import { getCookie, setCookie } from 'src/utils/cookie';
import { dispatch } from 'src/services/store';
import { actions } from 'src/slices/burgerSlice';

function setAccessAndRefreshToken(accessToken: string, refreshToken: string) {
  setCookie('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
}

export const getIngredients = createAsyncThunk(
  'burger/getIngredients',
  async () => {
    return await getIngredientsApi();
  }
);

export const getFeeds = createAsyncThunk('burger/getFeeds', async () => {
  return await getFeedsApi();
});

export const getOrders = createAsyncThunk('burger/getOrders', async () => {
  return await getOrdersApi();
});

export const postOrder = createAsyncThunk(
  'burger/postOrder',
  async (data: string[]) => {
    return await orderBurgerApi(data);
  }
);

export const getOrderByNumber = createAsyncThunk(
  'burger/getOrderByNumber',
  async (number: number) => {
    return await getOrderByNumberApi(number);
  }
);

export const registerUser = createAsyncThunk(
  'burger/registerUser',
  async (data: TRegisterData) => {
    return await registerUserApi(data)
    .then((data) => {
      setAccessAndRefreshToken(data.accessToken, data.refreshToken);
      return data;
    });
  }
);

export const loginUser = createAsyncThunk(
  'burger/loginUser',
  async (data: TLoginData) => {
    return await loginUserApi(data)
    .then((data) => {
      setAccessAndRefreshToken(data.accessToken, data.refreshToken);
      return data;
    });
  }
);

export const forgotPassword = createAsyncThunk(
  'burger/forgotPassword',
  async (data: { email: string }) => {
    return await forgotPasswordApi(data);
  }
);

export const resetPassword = createAsyncThunk(
  'burger/resetPassword',
  async (data: { password: string; token: string }) => {
    return await resetPasswordApi(data);
  }
);

export const getUser = createAsyncThunk('burger/getUser', 
  async () => {
    return await getUserApi();
});

export const updateUser = createAsyncThunk(
  'burger/updateUser',
  async(user: Partial<TRegisterData>)=>{
    return await updateUserApi(user);
  }
)

export const logout = createAsyncThunk(
  'burger/logout',
  async()=>{
    return await logoutApi()
    .then(()=>{
      localStorage.removeItem('refreshToken');
      setCookie('accessToken', '', {expires: -1});
    })
  }
)

export const checkIsAuth = createAsyncThunk(
  'burger/checkIsAuth',
  async()=>{
    if(getCookie('accessToken')) {
      dispatch(getUser()).finally(()=>{
        dispatch(actions.authChecked());
      })
    } else {
      dispatch(actions.authChecked());
    }
  }
)