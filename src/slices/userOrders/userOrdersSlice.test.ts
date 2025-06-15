import { getOrdersApi } from '../../utils/burger-api';
import { configureStore } from '@reduxjs/toolkit';
import { userOrdersReducer } from './userOrdersSlice';
import { getOrders } from '../../actions/ApiActions';

jest.mock('../../utils/burger-api');

const mockUserOrders = {
  orders: [
    {
      _id: '000123',
      status: 'done',
      name: 'Burger 1',
      createdAt: '12/12/2012',
      updatedAt: '12/12/2012',
      number: 12345,
      ingredients: ['643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa0943']
    },
    {
      _id: '98765',
      status: 'done',
      name: 'Burger 2',
      createdAt: '12/12/2012',
      updatedAt: '12/12/2012',
      number: 5375,
      ingredients: ['643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa0943']
    }
  ],
  total: 2,
  totalToday: 1
};

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.clearAllMocks();
  jest.useRealTimers();
});

describe('Тест получения заказов пользователя', () => {
  test('Тест успешного получения заказов пользователя', async () => {
    const store = configureStore({
      reducer: {
        userOrders: userOrdersReducer
      }
    });

    (getOrdersApi as jest.Mock).mockImplementation(
      () =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve(mockUserOrders.orders);
          }, 1000);
        })
    );

    const action = store.dispatch(getOrders());

    //Проверяем, что isLoad true во время выполнения
    expect(store.getState().userOrders.isLoad).toBe(true);

    jest.advanceTimersByTime(500);

    expect(store.getState().userOrders.isLoad).toBe(true);

    jest.advanceTimersByTime(500);

    await action;

    //Проверяем, что isLoad false после выполнения

    expect(store.getState().userOrders.isLoad).toBe(false);

    //Проверяем, что в стейте лежает те заказы пользователя, которые в моке
    expect(store.getState().userOrders.orders).toEqual(mockUserOrders.orders);

    //Проверяем, что в стейте нет ошибок
    expect(store.getState().userOrders.error).toBe('');
  });

  test('Неуспешный запрос', async () => {
    const store = configureStore({
      reducer: {
        userOrders: userOrdersReducer
      }
    });

    (getOrdersApi as jest.Mock).mockImplementation(
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

    const action = store.dispatch(getOrders());

    //Проверяем, что isLoad true во время выполнения
    expect(store.getState().userOrders.isLoad).toBe(true);

    jest.advanceTimersByTime(500);

    expect(store.getState().userOrders.isLoad).toBe(true);

    jest.advanceTimersByTime(500);

    await action;

    //Проверяем, что isLoad false после выполнения

    expect(store.getState().userOrders.isLoad).toBe(false);

    //Проверяем, что в стейте нет заказов
    expect(store.getState().userOrders.orders).toEqual([]);

    //Проверяем, что в стейте лежит ошибка
    expect(store.getState().userOrders.error).toBe('Error');
  });
});
