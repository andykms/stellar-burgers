import { TIngredient} from '@utils-types';
import { createSlice } from '@reduxjs/toolkit';
import {
  getIngredients
} from '../actions/ApiActions';

//Ингридиенты
export interface ingredientsState {
  ingredients: TIngredient[];
  isLoad: boolean;
  error: string;
}

const initialState: ingredientsState = {
  ingredients: [],
  isLoad: false,
  error: ''
}

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    getIngredients: (state) => state.ingredients,
    isLoad: (state) => state.isLoad,
    error: (state) => state.error,
  },
  extraReducers(builder) {
      builder.addCase(getIngredients.pending, (state) => {
        state.isLoad = true;
        state.error = '';
      })
      builder.addCase(getIngredients.fulfilled, (state, action) => {
        state.ingredients = action.payload;
        state.isLoad = false;
        state.error = '';
      })
      builder.addCase(getIngredients.rejected, (state, action) => {
        state.error = action.error.message?action.error.message:'';
        state.isLoad = false;
      })
  },
})