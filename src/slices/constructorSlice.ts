import { TConstructorIngredient, TOrder } from '@utils-types';
import { createSlice } from '@reduxjs/toolkit';
import { get } from 'http';

//Конструктор
export interface constructorState {
  ingredients: TConstructorIngredient[];
  bread: TConstructorIngredient|null;
  price: number;
  newOrder: TOrder | null;
}

const initialState: constructorState = {
  ingredients: [],
  bread: null,
  price: 0,
  newOrder: null
};

export const constructorSlice = createSlice({
  name: 'constructorSlice',
  initialState,
  selectors: {
    getConstructorIngredients: (state) => state.ingredients,
    getConstructorBread: (state) => state.bread,
    getConstructorPrice: (state) => state.price,
    getNewOrder: (state) => state.newOrder
  },
  reducers: {
    addIngredient: (state, action) => {
      if(action.payload.type === 'bun') {
        state.bread = action.payload;
      } else {
        const id = state.ingredients.length;
        const ingredient = {...action.payload, id};
        state.ingredients.push(ingredient);
      }
      state.price += action.payload.price;
    },
    deleteIngredient: (state, action) => {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.id !== action.payload.id
      );
      state.ingredients.forEach((ingredient, index) => {
        ingredient.id = index.toString();
      });
      state.price -= action.payload.price;
    },
    upIngredient: (state, action) => {
      const currentIndex = action.payload.id;
      for(let i = 1; i < state.ingredients.length; i++) {
        const prevIngredient = state.ingredients[i-1];
        const currentIngredient = state.ingredients[i];
        if(currentIngredient.id === currentIndex) {
          state.ingredients[i-1] = {...currentIngredient};
          state.ingredients[i] = {...prevIngredient};
          break;
        }
      }
    },
    downIngredient: (state, action) => {
      const currentIndex = action.payload.id;
      for(let i = 0; i < state.ingredients.length - 1; i++) {
        const nextIngredient = state.ingredients[i+1];
        const currentIngredient = state.ingredients[i];
        if(currentIngredient.id === currentIndex) {
          state.ingredients[i] = {...nextIngredient};
          state.ingredients[i+1] = {...currentIngredient};
          break;
        }
      }
    }
  }
});

export const { getConstructorIngredients, getConstructorPrice, getNewOrder, getConstructorBread} =
  constructorSlice.selectors;
export const { addIngredient, deleteIngredient, upIngredient, downIngredient } = constructorSlice.actions;
