import { TOrder } from '@utils-types';
import { createSlice } from '@reduxjs/toolkit';
import { getFeeds } from '../actions/ApiActions';

//Лента заказов
export interface feedState {
  feeds: TOrder[];
  total: number;
  totalToday: number;
  isLoad: boolean;
  error: string;
}

const initialState: feedState = {
  feeds: [],
  total: 0,
  totalToday: 0,
  isLoad: false,
  error: ''
};

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  selectors: {
    getFeedsList: (state) => state.feeds,
    getTotal: (state) => state.total,
    getTotalToday: (state) => state.totalToday,
    isLoadFeed: (state) => state.isLoad,
    errorFeed: (state) => state.error
  },
  extraReducers: (builder) => {
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

export const { getFeedsList, getTotal, getTotalToday, isLoadFeed, errorFeed } =
  feedSlice.selectors;
