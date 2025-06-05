import { TIngredient, TOrder } from '@utils-types';
import { createSlice } from '@reduxjs/toolkit';
import { postOrder } from 'src/actions/ApiActions';
import { get } from 'http';

//Конструктор
export interface constructorState {
  ingredients: TIngredient[];
  price: number;
  newOrder: TOrder | null;
}

const initialState: constructorState = {
  ingredients: [],
  price: 0,
  newOrder: null,
};

export const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  selectors: {
    getIngredients: (state) => state.ingredients,
    getPrice: (state) => state.price,
    getNewOrder: (state) => state.newOrder
  },
  reducers: {
    addIngredient: (state, action) => {
      state.ingredients.push(action.payload);
      state.price += action.payload.price;
    },
    deleteIngredient: (state, action) => {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient._id !== action.payload._id
      );
      state.price -= action.payload.price;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(postOrder.fulfilled, (state, action) => {
      state.newOrder = action.payload.order;
    })
  }
});

export const { addIngredient, deleteIngredient } = constructorSlice.actions;