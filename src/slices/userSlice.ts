import { TIngredient, TOrder, TOrdersData, TUser } from '@utils-types';
import { createSlice } from '@reduxjs/toolkit';
import {
  getIngredients,
  getFeeds,
  getOrders,
  postOrder,
  getOrderByNumber,
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
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
}

const initialState: userState = {
  user: {
    name: '',
    email: '',
  },
  isLoad: false,
  error: '',
  isSuccessForgotPassword: false,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  selectors: {
    getUser: (state) => state.user,
    isLoad: (state) => state.isLoad,
    error: (state) => state.error,
    isSuccessForgotPassword: (state) => state.isSuccessForgotPassword
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
