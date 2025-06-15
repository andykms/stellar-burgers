import { getFeedsApi, getOrderByNumberApi } from '../../utils/burger-api';
import { configureStore } from '@reduxjs/toolkit';
import { feedReducer } from './feedSlice';
import { getFeeds, getOrderByNumber } from '../../actions/ApiActions';

jest.mock('../../utils/burger-api');

const mockFeed = [
  {
    _id: '000123',
    status: 'done',
    name: 'Burger',
    createdAt: '12/12/2012',
    updatedAt: '12/12/2012',
    number: 12345,
    ingredients: ['643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa0943']
  },
  {
    _id: '54645hg4h4',
    status: 'done',
    name: 'Burger 2',
    createdAt: '12/12/2012',
    updatedAt: '12/12/2012',
    number: 53321,
    ingredients: ['643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa0943']
  }
];

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.clearAllMocks();
  jest.useRealTimers();
});

describe('Тест получения ленты заказов', () => {
  test('Тест успешного получения ленты заказов', async () => {
    const store = configureStore({
      reducer: {
        feed: feedReducer
      }
    });

    (getFeedsApi as jest.Mock).mockImplementation(
      () =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              success: true,
              orders: [...mockFeed],
              total: 0,
              totalToday: 0
            });
          }, 1000);
        })
    );

    const action = store.dispatch(getFeeds());

    //Проверяем, что isLoad true во время выполнения
    expect(store.getState().feed.isLoad).toBe(true);

    jest.advanceTimersByTime(500);

    expect(store.getState().feed.isLoad).toBe(true);

    jest.advanceTimersByTime(500);

    await action;

    //Проверяем, что isLoad false после выполнения

    expect(store.getState().feed.isLoad).toBe(false);

    //Проверяем, что в стейте лежает те заказы, которые в моке
    expect(store.getState().feed.feeds).toEqual(mockFeed);

    //Проверяем, что в стейте нет ошибок
    expect(store.getState().feed.error).toBe('');
  });

  test('Неуспешный запрос', async () => {
    const store = configureStore({
      reducer: {
        feed: feedReducer
      }
    });

    (getFeedsApi as jest.Mock).mockImplementation(
      () =>
        new Promise((resolve, reject) => {
          setTimeout(() => {
            reject({
              success: false,
              message: 'Error'
            });
          }, 1000);
        })
    );

    const action = store.dispatch(getFeeds());

    //Проверяем, что isLoad true во время выполнения
    expect(store.getState().feed.isLoad).toBe(true);

    jest.advanceTimersByTime(500);

    expect(store.getState().feed.isLoad).toBe(true);

    jest.advanceTimersByTime(500);

    await action;

    //Проверяем, что isLoad false после выполнения

    expect(store.getState().feed.isLoad).toBe(false);

    //Проверяем, что в стейте нет заказов
    expect(store.getState().feed.feeds).toEqual([]);

    //Проверяем, что в стейте лежит ошибка
    expect(store.getState().feed.error).toBe('Error');
  });
});

describe('Тест получения заказа по номеру', () => {
  test('Тест успешного получения заказа по номеру', async () => {
    const store = configureStore({
      reducer: {
        feed: feedReducer
      }
    });

    (getOrderByNumberApi as jest.Mock).mockImplementation(
      () =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              success: true,
              orders: [mockFeed[0]]
            });
          }, 1000);
        })
    );

    const action = store.dispatch(getOrderByNumber(12345));

    //Проверяем, что isLoad true во время выполнения
    expect(store.getState().feed.isLoad).toBe(true);

    jest.advanceTimersByTime(500);

    expect(store.getState().feed.isLoad).toBe(true);

    jest.advanceTimersByTime(500);

    await action;

    //Проверяем, что isLoad false после выполнения

    expect(store.getState().feed.isLoad).toBe(false);

    //Проверяем, что в стейте лежит тот заказ, который в моке
    expect(store.getState().feed.currentOrder).toEqual(mockFeed[0]);

    //Проверяем, что в стейте нет ошибок
    expect(store.getState().feed.error).toBe('');
  });

  test('Неуспешный запрос  заказа по номеру', async () => {
    const store = configureStore({
      reducer: {
        feed: feedReducer
      }
    });

    (getOrderByNumberApi as jest.Mock).mockImplementation(
      () =>
        new Promise((resolve, reject) => {
          setTimeout(() => {
            reject({
              success: false,
              message: 'Error'
            });
          }, 1000);
        })
    );

    const action = store.dispatch(getOrderByNumber(12345));

    //Проверяем, что isLoad true во время выполнения
    expect(store.getState().feed.isLoad).toBe(true);

    jest.advanceTimersByTime(500);

    expect(store.getState().feed.isLoad).toBe(true);

    jest.advanceTimersByTime(500);

    await action;

    //Проверяем, что isLoad false после выполнения

    expect(store.getState().feed.isLoad).toBe(false);

    //Проверяем, что в стейте нет текущего заказа
    expect(store.getState().feed.currentOrder).toEqual(null);

    //Проверяем, что в стейте лежит ошибка
    expect(store.getState().feed.error).toBe('Error');
  });
});
