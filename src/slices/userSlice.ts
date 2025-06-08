import { TUser } from '@utils-types';
import { createSlice } from '@reduxjs/toolkit';
import {
  registerUser,
  loginUser,
  forgotPassword,
  getUser,
  updateUser,
  logout
} from '../actions/ApiActions';

//Пользователь
export interface userState {
  user: TUser;
  isLoad: boolean;
  errorLogin: string;
  errorRegister: string;
  errorForgot: string;
  errorUpdate: string;
  isSuccessForgotPassword: boolean;
  isChekedAuth: boolean;
}

const initialState: userState = {
  user: {
    name: '',
    email: ''
  },
  isLoad: false,
  errorLogin: '',
  errorRegister: '',
  errorForgot: '',
  errorUpdate: '',
  isSuccessForgotPassword: false,
  isChekedAuth: false
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    checkAuthTrue: (state) => {
      state.isChekedAuth = true;
    },
    clearUserInfo: (state) => {
      state.user = {
        name: '',
        email: ''
      };
      state.isLoad = false;
    }
  },
  selectors: {
    getUserInfo: (state) => state.user,
    isLoadUserInfo: (state) => state.isLoad,
    errorLogin: (state) => state.errorLogin,
    errorRegister: (state) => state.errorRegister,
    errorForgot: (state) => state.errorForgot,
    isSuccessForgotPassword: (state) => state.isSuccessForgotPassword,
    isChekedAuth: (state) => state.isChekedAuth
  },
  extraReducers: (builder) => {
    //Получили пользователя по accessToken
    builder.addCase(getUser.pending, (state) => {
      state.isLoad = true;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.isLoad = false;
    });
    builder.addCase(getUser.rejected, (state, action) => {
      state.isLoad = false;
    });
    //Обновили пользователя
    builder.addCase(updateUser.pending, (state) => {
      state.isLoad = true;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.isLoad = false;
      state.errorUpdate = '';
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.errorUpdate = action.error.message ? action.error.message : '';
      state.isLoad = false;
    });
    //Залогинились
    builder.addCase(loginUser.pending, (state) => {
      state.isLoad = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.isLoad = false;
      state.errorLogin = '';
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.errorLogin = action.error.message ? action.error.message : '';
      state.isLoad = false;
    });
    //Зарегались
    builder.addCase(registerUser.pending, (state) => {
      state.isLoad = true;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.isLoad = false;
      state.errorRegister = '';
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.errorRegister = action.error.message ? action.error.message : '';
      state.isLoad = false;
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.isLoad = false;
    });
    //Забыли пароль
    builder.addCase(forgotPassword.pending, (state) => {
      state.isLoad = true;
    });
    builder.addCase(forgotPassword.fulfilled, (state, action) => {
      state.isSuccessForgotPassword = action.payload.success;
      state.isLoad = false;
      state.errorForgot = '';
    });
    builder.addCase(forgotPassword.rejected, (state, action) => {
      state.errorForgot = action.error.message ? action.error.message : '';
      state.isLoad = false;
    });
  }
});

export const {
  getUserInfo,
  isLoadUserInfo,
  errorLogin,
  errorRegister,
  errorForgot,
  isSuccessForgotPassword,
  isChekedAuth
} = userSlice.selectors;

export const { checkAuthTrue, clearUserInfo } = userSlice.actions;
