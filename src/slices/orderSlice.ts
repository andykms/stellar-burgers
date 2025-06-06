import { TOrder } from '@utils-types';
import { createSlice } from '@reduxjs/toolkit';
import { getOrderByNumber, postOrder } from '../actions/ApiActions';

export interface OrderState {
  ingredients: string[];
  isLoad: boolean;
  error: string;
  currentOrders: TOrder[];
  successOrder: TOrder | null;
}

const initialState: OrderState = {
  ingredients: [],
  isLoad: false,
  error: '',
  currentOrders: [],
  successOrder: null
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  selectors: {
    getIngredientsIds: (state) => state.ingredients,
    isLoadOrder: (state) => state.isLoad,
    errorOrder: (state) => state.error,
    getCurrentOrders: (state) => state.currentOrders,
    getSuccessOrder: (state) => state.successOrder
  },
  reducers: {
    addIngredient: (state, action) => {
      state.ingredients.push(action.payload);
    },
    deleteIngredient: (state, action) => {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient !== action.payload
      );
    }
  },
  extraReducers: (builder) => {
    //Получение заказов по номеру
    builder.addCase(getOrderByNumber.fulfilled, (state, action) => {
      state.currentOrders = action.payload.orders;
      state.isLoad = false;
      state.error = '';
    });
    builder.addCase(getOrderByNumber.rejected, (state, action) => {
      state.error = action.error.message ? action.error.message : '';
      state.isLoad = false;
    });
    builder.addCase(getOrderByNumber.pending, (state) => {
      state.isLoad = true;
      state.error = '';
    });
    //Отправка заказа
    builder.addCase(postOrder.fulfilled, (state, action) => {
      state.successOrder = action.payload.order;
      state.isLoad = false;
      state.error = '';
    });
    builder.addCase(postOrder.rejected, (state, action) => {
      state.error = action.error.message ? action.error.message : '';
      state.isLoad = false;
    });
    builder.addCase(postOrder.pending, (state) => {
      state.isLoad = true;
      state.error = '';
    });
  }
});

export const { addIngredient, deleteIngredient } = orderSlice.actions;
export const {
  getIngredientsIds,
  isLoadOrder,
  errorOrder,
  getCurrentOrders,
  getSuccessOrder
} = orderSlice.selectors;
