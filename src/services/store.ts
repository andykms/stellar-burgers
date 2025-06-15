import { combineSlices, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

import { constructorSlice } from '../slices/constructor/constructorSlice';
import { feedSlice } from '../slices/feed/feedSlice';
import { ingredientsSlice } from '../slices/ingredients/ingredientsSlice';
import { userSlice } from '../slices/user/userSlice';
import { userOrdersSlice } from '../slices/userOrders/userOrdersSlice';
import { orderSlice } from '../slices/order/orderSlice';

export const rootReducer = combineSlices(
  constructorSlice,
  feedSlice,
  ingredientsSlice,
  userSlice,
  userOrdersSlice,
  orderSlice
); // Заменить на импорт настоящего редьюсера

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
