import { TOrder } from '@utils-types';
import { createSlice } from '@reduxjs/toolkit';
import { getFeeds, getOrderByNumber } from '../actions/ApiActions';

//Лента заказов
export interface feedState {
  feeds: TOrder[];
  total: number;
  totalToday: number;
  isLoad: boolean;
  error: string;
  currentOrder: TOrder | null;
}

const initialState: feedState = {
  feeds: [],
  total: 0,
  totalToday: 0,
  isLoad: false,
  error: '',
  currentOrder: null
};

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  selectors: {
    getFeedsList: (state) => state.feeds,
    getTotal: (state) => state.total,
    getTotalToday: (state) => state.totalToday,
    getIsLoadFeed: (state) => state.isLoad,
    getErrorFeed: (state) => state.error,
    getCurrentOrder: (state) => state.currentOrder
  },
  extraReducers: (builder) => {
    builder.addCase(getOrderByNumber.pending, (state) => {
      state.error = '';
    });
    builder.addCase(getOrderByNumber.fulfilled, (state, action) => {
      state.currentOrder = action.payload.orders[0];
      state.error = '';
    });
    builder.addCase(getOrderByNumber.rejected, (state, action) => {
      state.error = action.error.message ? action.error.message : '';
    });
    builder.addCase(getFeeds.fulfilled, (state, action) => {
      state.feeds = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
      state.isLoad = false;
      state.error = '';
    });
    builder.addCase(getFeeds.rejected, (state, action) => {
      state.error = action.error.message ? action.error.message : '';
      state.isLoad = false;
    });
    builder.addCase(getFeeds.pending, (state) => {
      state.isLoad = true;
      state.error = '';
    });
  }
});

export const {
  getFeedsList,
  getTotal,
  getTotalToday,
  getIsLoadFeed,
  getErrorFeed,
  getCurrentOrder
} = feedSlice.selectors;
