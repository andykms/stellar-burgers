import { TOrder } from '@utils-types';
import { createSlice } from '@reduxjs/toolkit';
import { getOrders } from '../../actions/ApiActions';

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

export const userOrdersSlice = createSlice({
  name: 'userOrder',
  initialState,
  reducers: {},
  selectors: {
    getUserOrders: (state) => state.orders,
    getIsLoadUserOrders: (state) => state.isLoad,
    getErrorUserOrders: (state) => state.error
  },
  extraReducers: (builder) => {
    builder.addCase(getOrders.fulfilled, (state, action) => {
      state.orders = action.payload;
      state.isLoad = false;
      state.error = '';
    });
    builder.addCase(getOrders.rejected, (state, action) => {
      state.error = action.error.message ? action.error.message : '';
      state.isLoad = false;
    });
    builder.addCase(getOrders.pending, (state) => {
      state.isLoad = true;
      state.error = '';
    });
  }
});

export const { getUserOrders, getIsLoadUserOrders, getErrorUserOrders } =
  userOrdersSlice.selectors;

export const userOrdersReducer = userOrdersSlice.reducer;
