import { TIngredient, TOrder, TOrdersData, TUser } from '@utils-types';
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
  error: string;
  isSuccessForgotPassword: boolean;
  isAuthChecked: boolean;
}

const initialState: userState = {
  user: {
    name: '',
    email: '',
  },
  isLoad: false,
  error: '',
  isSuccessForgotPassword: false,
  isAuthChecked: false,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authChecked: (state) => {
      state.isAuthChecked = true;
    }
  },
  selectors: {
    getUserInfo: (state) => state.user,
    isLoadUserInfo: (state) => state.isLoad,
    errorUserInfo: (state) => state.error,
    isSuccessForgotPassword: (state) => state.isSuccessForgotPassword,
    isAuthChecked: (state) => state.isAuthChecked
  },
  extraReducers: (builder) =>{
    //Получили пользователя по accessToken
    builder.addCase(getUser.pending, (state) => {
      state.isLoad = true;
      state.error = '';
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.isLoad = false;
      state.error = '';
    });
    builder.addCase(getUser.rejected, (state, action) => {
      state.error = action.error.message?action.error.message:'';
      state.isLoad = false;
    });
    //Обновили пользователя
    builder.addCase(updateUser.pending, (state) => {
      state.isLoad = true;
      state.error = '';
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.isLoad = false;
      state.error = '';
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.error = action.error.message?action.error.message:'';
      state.isLoad = false;
    });
    //Залогинились
    builder.addCase(loginUser.pending, (state) => {
      state.isLoad = true;
      state.error = '';
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.isLoad = false;
      state.error = '';
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.error = action.error.message?action.error.message:'';
      state.isLoad = false;
    }) 
    //Зарегались
    builder.addCase(registerUser.pending, (state) => {
      state.isLoad = true;
      state.error = '';
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.isLoad = false;
      state.error = '';
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.error = action.error.message?action.error.message:'';
      state.isLoad = false;
    })
    //Вышли из аккаунта
    builder.addCase(logout.pending, (state) => {
      state.isLoad = true;
      state.error = '';
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.user = {
        name: '',
        email: ''
      }
      state.isLoad = false;
      state.error = '';
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.error = action.error.message?action.error.message:'';
      state.isLoad = false;
    })
    //Забыли пароль
    builder.addCase(forgotPassword.pending, (state) => {
      state.isLoad = true;
      state.error = '';
    });
    builder.addCase(forgotPassword.fulfilled, (state, action) => {
      state.isSuccessForgotPassword = action.payload.success;
      state.isLoad = false;
      state.error = '';
    });
    builder.addCase(forgotPassword.rejected, (state, action) => {
      state.error = action.error.message?action.error.message:'';
      state.isLoad = false;
    })
  }
});

export const { getUserInfo, isLoadUserInfo, errorUserInfo, isSuccessForgotPassword, isAuthChecked } = userSlice.selectors;
export const { authChecked } = userSlice.actions;