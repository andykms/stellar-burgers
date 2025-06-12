import { TConstructorIngredient, TOrder } from '@utils-types';
import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

//Конструктор
export interface constructorState {
  ingredients: TConstructorIngredient[];
  bread: TConstructorIngredient | null;
  newOrder: TOrder | null;
}

const initialState: constructorState = {
  ingredients: [],
  bread: null,
  newOrder: null
};

export const constructorSlice = createSlice({
  name: 'constructorSlice',
  initialState,
  selectors: {
    getConstructorIngredients: (state) => state.ingredients,
    getConstructorBread: (state) => state.bread,
    getNewOrder: (state) => state.newOrder
  },
  reducers: {
    addIngredient: (state, action) => {
      if (action.payload.type === 'bun') {
        state.bread = action.payload;
      } else {
        const id = uuidv4();
        const ingredient = { ...action.payload, id };
        state.ingredients.push(ingredient);
      }
    },
    deleteIngredient: (state, action) => {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.id !== action.payload.id
      );
    },
    upIngredient: (state, action) => {
      const currentIndex = action.payload.id;
      for (let i = 1; i < state.ingredients.length; i++) {
        const prevIngredient = state.ingredients[i - 1];
        const currentIngredient = state.ingredients[i];
        if (currentIngredient.id === currentIndex) {
          state.ingredients[i - 1] = { ...currentIngredient };
          state.ingredients[i] = { ...prevIngredient };
          break;
        }
      }
    },
    downIngredient: (state, action) => {
      const currentIndex = action.payload.id;
      for (let i = 0; i < state.ingredients.length - 1; i++) {
        const nextIngredient = state.ingredients[i + 1];
        const currentIngredient = state.ingredients[i];
        if (currentIngredient.id === currentIndex) {
          state.ingredients[i] = { ...nextIngredient };
          state.ingredients[i + 1] = { ...currentIngredient };
          break;
        }
      }
    },
    clearConstructor: (state) => {
      state.ingredients = [];
      state.bread = null;
    }
  }
});

export const { getConstructorIngredients, getNewOrder, getConstructorBread } =
  constructorSlice.selectors;
export const {
  addIngredient,
  deleteIngredient,
  upIngredient,
  downIngredient,
  clearConstructor
} = constructorSlice.actions;
