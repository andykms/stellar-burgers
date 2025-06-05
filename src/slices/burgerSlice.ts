import { TIngredient, TOrder, TOrdersData, TUser } from "@utils-types"
import { createSlice } from "@reduxjs/toolkit";
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
  logout,
 } from "src/actions/ApiActions";

export interface BurgerState {
  ingredients: TIngredient[];
  feeds: TOrdersData;
  userInfo: TUser;
  orders: TOrder[];
  currentOrder: TOrder[];
  error: string,
  isLoad: boolean,
  isAuthChecked: boolean,
}

const initialState: BurgerState = {
  ingredients: [],
  feeds: {
    orders: [],
    total: 0,
    totalToday: 0,
  },
  userInfo: {
    email: '',
    name: '',
  },
  orders: [],
  currentOrder: [],
  error: '',
  isLoad: false,
  isAuthChecked: false,
}

export const burgerSlice = createSlice({
  name: 'burger',
  initialState,
  reducers: {
    userLogout: (state) => {
      state.userInfo = {
        email: '',
        name: '',
      }
      state.isAuthChecked = false;
      state.orders = [];
    },
    authChecked: (state) => {
      state.isAuthChecked = true;
    }
  }, 
  selectors: {
    ingredients: (state: BurgerState) => state.ingredients,
    feeds: (state: BurgerState) => state.feeds,
    orders: (state: BurgerState) => state.orders,
    currentOrder: (state: BurgerState) => state.currentOrder,
    userInfo: (state: BurgerState) => state.userInfo,
    isAuthChecked: (state: BurgerState) => state.isAuthChecked,
  },
  extraReducers: (builder) =>{
    builder
    .addCase(getIngredients.fulfilled, (state, action) => {
      state.ingredients = action.payload;
    })
    .addCase(getFeeds.fulfilled, (state, action) => {
      state.feeds = action.payload;
    })
    .addCase(getOrders.fulfilled, (state, action) => {
      state.orders = action.payload;
    })
    .addCase(getOrderByNumber.fulfilled, (state, action) => {
      state.currentOrder = action.payload.orders;
    })
    .addCase(registerUser.fulfilled, (state, action) => {
      state.userInfo = action.payload.user;
    })
    .addCase(loginUser.fulfilled, (state, action) => {
      state.userInfo = action.payload.user;
    })
    .addCase(getUser.fulfilled, (state, action) => {
      state.userInfo = action.payload.user;
    })
    .addCase(updateUser.fulfilled, (state, action) => {
      state.userInfo = action.payload.user;
    })
  }
})


export const actions = burgerSlice.actions;
export const selectors  = burgerSlice.selectors;
export const burgerReducer = burgerSlice.reducer;