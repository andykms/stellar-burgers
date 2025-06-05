import {TOrder} from '@utils-types';
import { createSlice } from '@reduxjs/toolkit';
import {
  getOrders
} from '../actions/ApiActions';

//Заказы пользователя
export interface ordersState {
  orders: TOrder[];
  isLoad: boolean;
  error: string;
}

const initialState: ordersState = {
  orders: [],
  isLoad: false,
  error: ''
};

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  selectors: {
    getOrders: (state) => state.orders,
    isLoad: (state) => state.isLoad,
    error: (state) => state.error
  },
  extraReducers: (builder) => {
    builder.addCase(getOrders.fulfilled, (state, action) => {
      state.orders = action.payload;
      state.isLoad = false;
      state.error = '';
    });
    builder.addCase(getOrders.rejected, (state, action) => {
      state.error = action.error.message?action.error.message:'';
      state.isLoad = false;
    });
    builder.addCase(getOrders.pending, (state) => {
      state.isLoad = true;
      state.error = '';
    });
  }
});