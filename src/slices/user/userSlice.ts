import { TUser } from '@utils-types';
import { createSlice } from '@reduxjs/toolkit';
import {
  registerUser,
  loginUser,
  forgotPassword,
  getUser,
  updateUser,
  logout
} from '../../actions/ApiActions';
import { act } from 'react-dom/test-utils';

//Пользователь
export interface userState {
  user: TUser;
  isLoad: boolean;
  errorLogin: string;
  errorRegister: string;
  errorForgot: string;
  errorUpdate: string;
  errorGetUser: string;
  errorLogout: string;
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
  errorGetUser: '',
  errorLogout: '',
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
    getIsAuth: (state) =>
      state.user.name.length > 0 && state.user.email.length > 0
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
      state.errorGetUser = action.error.message ? action.error.message : '';
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
      console.log(action.payload.user);
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
      state.errorLogout = action.error.message ? action.error.message : '';
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
