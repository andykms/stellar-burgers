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
    getIsLoadUserInfo: (state) => state.isLoad,
    getErrorLogin: (state) => state.errorLogin,
    getErrorRegister: (state) => state.errorRegister,
    getErrorForgot: (state) => state.errorForgot,
    getIsChekedAuth: (state) => state.isChekedAuth,
    getIsAuth: (state) => state.user.name && state.user.email
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
  getIsLoadUserInfo,
  getErrorLogin,
  getErrorRegister,
  getErrorForgot,
  getIsChekedAuth,
  getIsAuth
} = userSlice.selectors;

export const { checkAuthTrue, clearUserInfo } = userSlice.actions;
