import { TOrder } from '@utils-types';
import { createSlice } from '@reduxjs/toolkit';
import { getOrderByNumber, postOrder } from '../actions/ApiActions';

export interface OrderState {
  ingredients: string[];
  isLoad: boolean;
  error: string;
  successOrder: TOrder | null;
}

const initialState: OrderState = {
  ingredients: [],
  isLoad: false,
  error: '',
  successOrder: null
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  selectors: {
    getIsLoadOrder: (state) => state.isLoad,
    getErrorOrder: (state) => state.error,
    getSuccessOrder: (state) => state.successOrder
  },
  reducers: {
    addIngredientIdToOrder: (state, action) => {
      state.ingredients.push(action.payload);
    },
    deleteIngredientIdFromOrder: (state, action) => {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient !== action.payload
      );
    },
    clearSuccessOrder: (state) => {
      state.successOrder = null;
    }
  },
  extraReducers: (builder) => {
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

export const {
  addIngredientIdToOrder,
  deleteIngredientIdFromOrder,
  clearSuccessOrder
} = orderSlice.actions;
export const { getIsLoadOrder, getErrorOrder, getSuccessOrder } =
  orderSlice.selectors;
