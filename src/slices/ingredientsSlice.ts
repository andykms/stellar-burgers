import { TIngredient } from '@utils-types';
import { createSlice } from '@reduxjs/toolkit';
import { getIngredients } from '../actions/ApiActions';

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
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
  },
  selectors: {
    getIngredientsList: (state) => state.ingredients,
    getMainIngredientsList: (state) =>
      state.ingredients.filter((ingredient) => ingredient.type === 'main'),
    getBunIngredientsList: (state) =>
      state.ingredients.filter((ingredient) => ingredient.type === 'bun'),
    getSauceIngredientsList: (state) =>
      state.ingredients.filter((ingredient) => ingredient.type === 'sauce'),
    isLoadIngredients: (state) => state.isLoad,
    errorIngredients: (state) => state.error,
  },
  extraReducers(builder) {
    builder.addCase(getIngredients.pending, (state) => {
      state.isLoad = true;
      state.error = '';
    });
    builder.addCase(getIngredients.fulfilled, (state, action) => {
      state.ingredients = action.payload;
      state.isLoad = false;
      state.error = '';
    });
    builder.addCase(getIngredients.rejected, (state, action) => {
      state.error = action.error.message ? action.error.message : '';
      state.isLoad = false;
    });
  }
});

export const {
  getIngredientsList,
  isLoadIngredients,
  errorIngredients,
  getMainIngredientsList,
  getBunIngredientsList,
  getSauceIngredientsList,
} = ingredientsSlice.selectors;

