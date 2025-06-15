import { orderBurgerApi } from '../../utils/burger-api';
import { configureStore } from '@reduxjs/toolkit';
import { orderReducer } from './orderSlice';
import { postOrder } from '../../actions/ApiActions';

jest.mock('../../utils/burger-api');

const mockOrder = {
  _id: '000123',
  status: 'done',
  name: 'Burger',
  createdAt: '12/12/2012',
  updatedAt: '12/12/2012',
  number: 12345,
  ingredients: ['643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa0943']
};

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.clearAllMocks();
  jest.useRealTimers();
});

describe('Тест отправки заказа', () => {
  test('Тест успешной отправки заказа', async () => {
    const store = configureStore({
      reducer: {
        order: orderReducer
      }
    });

    (orderBurgerApi as jest.Mock).mockImplementation(
      () =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              success: true,
              order: { ...mockOrder },
              name: 'Burger'
            });
          }, 1000);
        })
    );

    const action = store.dispatch(
      postOrder(['643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa0943'])
    );

    //Проверяем, что isLoad true во время выполнения
    expect(store.getState().order.isLoad).toBe(true);

    jest.advanceTimersByTime(500);

    expect(store.getState().order.isLoad).toBe(true);

    jest.advanceTimersByTime(500);

    await action;

    //Проверяем, что isLoad false после выполнения

    expect(store.getState().order.isLoad).toBe(false);

    //Проверяем, что в стейте лежает те заказы, которые в моке
    expect(store.getState().order.successOrder).toEqual(mockOrder);

    //Проверяем, что в стейте нет ошибок
    expect(store.getState().order.error).toBe('');
  });

  test('Неуспешный запрос', async () => {
    const store = configureStore({
      reducer: {
        order: orderReducer
      }
    });

    (orderBurgerApi as jest.Mock).mockImplementation(
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

    const action = store.dispatch(
      postOrder(['643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa0943'])
    );

    //Проверяем, что isLoad true во время выполнения
    expect(store.getState().order.isLoad).toBe(true);

    jest.advanceTimersByTime(500);

    expect(store.getState().order.isLoad).toBe(true);

    jest.advanceTimersByTime(500);

    await action;

    //Проверяем, что isLoad false после выполнения

    expect(store.getState().order.isLoad).toBe(false);

    //Проверяем, что в стейте нет полученного заказа
    expect(store.getState().order.successOrder).toEqual(null);

    //Проверяем, что в стейте лежит ошибка
    expect(store.getState().order.error).toBe('Error');
  });
});
