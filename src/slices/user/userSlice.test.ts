import {
  registerUserApi,
  loginUserApi,
  forgotPasswordApi,
  resetPasswordApi,
  getUserApi,
  updateUserApi,
  logoutApi
} from '../../utils/burger-api';
import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './userSlice';
import {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  getUser,
  updateUser,
  logout
} from '../../actions/ApiActions';
import { access } from 'fs';

jest.mock('../../utils/burger-api');

const mockRegister = {
  success: true,
  accessToken: 'test',
  refreshToken: 'test',
  user: {
    email: 'test@test.com',
    name: 'Test'
  }
};

const mockLogin = {
  success: true,
  accessToken: 'test',
  refreshToken: 'test',
  user: {
    email: 'test@test.com',
    name: 'Test'
  }
};

const mockForgot = {
  success: true
};

const mockReset = {
  success: true
};

const mockGet = {
  success: true,
  user: {
    email: 'test@test.com',
    name: 'Test'
  }
};

const mockUpdate = {
  success: true,
  user: {
    email: 'test@test.com',
    name: 'Test'
  }
};

beforeAll(() => {
  const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn()
  };
  global.localStorage = localStorageMock as any;
  global.document = {
    cookie: ''
  } as any;
});

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.clearAllMocks();
  jest.useRealTimers();
});

describe('Тест регистрации', () => {
  test('Тест успешной регистрации', async () => {
    const store = configureStore({
      reducer: {
        user: userReducer
      }
    });

    (registerUserApi as jest.Mock).mockImplementation(
      () =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve(mockRegister);
          }, 1000);
        })
    );

    const action = store.dispatch(
      registerUser({ ...mockRegister.user, password: 'test' })
    );

    //Проверяем, что isLoad true во время выполнения
    expect(store.getState().user.isLoad).toBe(true);

    jest.advanceTimersByTime(500);

    expect(store.getState().user.isLoad).toBe(true);

    jest.advanceTimersByTime(500);

    await action;

    //Проверяем, что isLoad false после выполнения

    expect(store.getState().user.isLoad).toBe(false);

    //Проверяем, что в стейте лежат данные пользователя как в моке
    expect(store.getState().user.user).toEqual(mockRegister.user);

    //Проверяем, что в стейте нет ошибок
    expect(store.getState().user.errorRegister).toBe('');
  });

  test('Неуспешная регистрация', async () => {
    const store = configureStore({
      reducer: {
        user: userReducer
      }
    });

    (registerUserApi as jest.Mock).mockImplementation(
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
      registerUser({ ...mockRegister.user, password: 'test' })
    );

    //Проверяем, что isLoad true во время выполнения
    expect(store.getState().user.isLoad).toBe(true);

    jest.advanceTimersByTime(500);

    expect(store.getState().user.isLoad).toBe(true);

    jest.advanceTimersByTime(500);

    await action;

    //Проверяем, что isLoad false после выполнения

    expect(store.getState().user.isLoad).toBe(false);

    //Проверяем, что в стейте нет информации о пользователе
    const emptyEqual: { [key: string]: string } = {};
    Object.keys(mockRegister.user).forEach((key) => {
      emptyEqual[key] = '';
    });
    expect(store.getState().user.user).toEqual(emptyEqual);

    //Проверяем, что в стейте лежит ошибка
    expect(store.getState().user.errorRegister).toBe('Error');
  });
});

describe('Тест входа', () => {
  test('Тест успешного входа', async () => {
    const store = configureStore({
      reducer: {
        user: userReducer
      }
    });

    (loginUserApi as jest.Mock).mockImplementation(
      () =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve(mockLogin);
          }, 1000);
        })
    );

    const action = store.dispatch(
      loginUser({ email: mockLogin.user.email, password: 'test' })
    );

    //Проверяем
    expect(store.getState().user.isLoad).toBe(true);

    jest.advanceTimersByTime(500);

    expect(store.getState().user.isLoad).toBe(true);

    jest.advanceTimersByTime(500);

    await action;

    //Проверяем, что isLoad false после выполнения

    expect(store.getState().user.isLoad).toBe(false);

    //Проверяем, что в стейте лежат данные пользователя как в моке
    expect(store.getState().user.user).toEqual(mockLogin.user);

    //Проверяем, что в стейте нет ошибок
    expect(store.getState().user.errorLogin).toBe('');
  });

  test('Тест неуспешного входа', async () => {
    const store = configureStore({
      reducer: {
        user: userReducer
      }
    });

    (loginUserApi as jest.Mock).mockImplementation(
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
      loginUser({ email: mockLogin.user.email, password: 'test' })
    );

    //Проверяем, что isLoad true во время выполнения
    expect(store.getState().user.isLoad).toBe(true);

    jest.advanceTimersByTime(500);

    expect(store.getState().user.isLoad).toBe(true);

    jest.advanceTimersByTime(500);

    await action;

    //Проверяем, что isLoad false после выполнения

    expect(store.getState().user.isLoad).toBe(false);

    //Проверяем, что в стейте нет информации о пользователе
    const emptyEqual: { [key: string]: string } = {};
    Object.keys(mockLogin.user).forEach((key) => {
      emptyEqual[key] = '';
    });
    expect(store.getState().user.user).toEqual(emptyEqual);

    //Проверяем, что в стейте лежит ошибка
    expect(store.getState().user.errorLogin).toBe('Error');
  });
});

describe('Тест обновления данных пользователя', () => {
  test('Тест успешного обновления данных пользователя', async () => {
    const store = configureStore({
      reducer: {
        user: userReducer
      }
    });

    (updateUserApi as jest.Mock).mockImplementation(
      () =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve(mockUpdate);
          }, 1000);
        })
    );

    const action = store.dispatch(
      updateUser({ ...mockUpdate.user, password: 'test' })
    );

    //Проверяем, что isLoad true во время выполнения
    expect(store.getState().user.isLoad).toBe(true);

    jest.advanceTimersByTime(500);

    expect(store.getState().user.isLoad).toBe(true);

    jest.advanceTimersByTime(500);

    await action;

    //Проверяем, что isLoad false после выполнения

    expect(store.getState().user.isLoad).toBe(false);

    //Проверяем, что в стейте лежат данные пользователя как в моке
    expect(store.getState().user.user).toEqual(mockUpdate.user);

    //Проверяем, что в стейте нет ошибок
    expect(store.getState().user.errorUpdate).toBe('');
  });

  test('Тест неуспешного обновления данных пользователя', async () => {
    const store = configureStore({
      reducer: {
        user: userReducer
      }
    });

    (updateUserApi as jest.Mock).mockImplementation(
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
      updateUser({ ...mockUpdate.user, password: 'test' })
    );

    //Проверяем, что isLoad true во время выполнения
    expect(store.getState().user.isLoad).toBe(true);

    jest.advanceTimersByTime(500);

    expect(store.getState().user.isLoad).toBe(true);

    jest.advanceTimersByTime(500);

    await action;

    //Проверяем, что isLoad false после выполнения

    expect(store.getState().user.isLoad).toBe(false);

    //Проверяем, что в стейте нет информации о пользователе
    const emptyEqual: { [key: string]: string } = {};
    Object.keys(mockUpdate.user).forEach((key) => {
      emptyEqual[key] = '';
    });
    expect(store.getState().user.user).toEqual(emptyEqual);

    //Проверяем, что в стейте лежит ошибка
    expect(store.getState().user.errorUpdate).toBe('Error');
  });
});

describe('Тест получения пользователя по токену', () => {
  test('Тест успешного получения пользователя по токену', async () => {
    const store = configureStore({
      reducer: {
        user: userReducer
      }
    });

    (getUserApi as jest.Mock).mockImplementation(
      () =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve(mockGet);
          }, 1000);
        })
    );

    const action = store.dispatch(getUser());

    //Проверяем, что isLoad true во время выполнения
    expect(store.getState().user.isLoad).toBe(true);

    jest.advanceTimersByTime(500);

    expect(store.getState().user.isLoad).toBe(true);

    jest.advanceTimersByTime(500);

    await action;

    //Проверяем, что isLoad false после выполнения

    expect(store.getState().user.isLoad).toBe(false);

    //Проверяем, что в стейте лежат данные пользователя как в моке
    expect(store.getState().user.user).toEqual(mockGet.user);

    //Проверяем, что в стейте нет ошибок
    expect(store.getState().user.errorGetUser).toBe('');
  });

  test('Тест неуспешного получения пользователя по токену', async () => {
    const store = configureStore({
      reducer: {
        user: userReducer
      }
    });

    (getUserApi as jest.Mock).mockImplementation(
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

    const action = store.dispatch(getUser());

    //Проверяем, что isLoad true во время выполнения
    expect(store.getState().user.isLoad).toBe(true);

    jest.advanceTimersByTime(500);

    expect(store.getState().user.isLoad).toBe(true);

    jest.advanceTimersByTime(500);

    await action;

    //Проверяем, что isLoad false после выполнения

    expect(store.getState().user.isLoad).toBe(false);

    //Проверяем, что в стейте нет информации о пользователе
    const emptyEqual: { [key: string]: string } = {};
    Object.keys(mockGet.user).forEach((key) => {
      emptyEqual[key] = '';
    });
    expect(store.getState().user.user).toEqual(emptyEqual);

    //Проверяем, что в стейте лежит ошибка
    expect(store.getState().user.errorGetUser).toBe('Error');
  });
});

describe('Тест отправки запроса на восстановление пароля', () => {
  test('Тест успешного отправки запроса на восстановление пароля', async () => {
    const store = configureStore({
      reducer: {
        user: userReducer
      }
    });

    (forgotPasswordApi as jest.Mock).mockImplementation(
      () =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve(mockForgot);
          }, 1000);
        })
    );

    const action = store.dispatch(forgotPassword({ email: 'test@test.com' }));

    //Проверяем, что isLoad true во время выполнения
    expect(store.getState().user.isLoad).toBe(true);

    jest.advanceTimersByTime(500);

    expect(store.getState().user.isLoad).toBe(true);

    jest.advanceTimersByTime(500);

    await action;

    //Проверяем, что isLoad false после выполнения

    expect(store.getState().user.isLoad).toBe(false);
  });

  test('Тест неуспешного отправки запроса на восстановление пароля', async () => {
    const store = configureStore({
      reducer: {
        user: userReducer
      }
    });

    (forgotPasswordApi as jest.Mock).mockImplementation(
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

    const action = store.dispatch(forgotPassword({ email: 'test@test.com' }));

    //Проверяем, что isLoad true во время выполнения
    expect(store.getState().user.isLoad).toBe(true);

    jest.advanceTimersByTime(500);

    expect(store.getState().user.isLoad).toBe(true);

    jest.advanceTimersByTime(500);

    await action;

    //Проверяем, что isLoad false после выполнения

    expect(store.getState().user.isLoad).toBe(false);

    //Проверяем, что в стейте лежит ошибка
    expect(store.getState().user.errorForgot).toBe('Error');
  });
});

describe('Тест выхода из аккаунта', () => {
  test('Тест успешного выхода из аккаунта', async () => {
    const store = configureStore({
      reducer: {
        user: userReducer
      }
    });

    (logoutApi as jest.Mock).mockImplementation(
      () =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve({ success: true });
          }, 1000);
        })
    );

    const action = store.dispatch(logout());

    expect(store.getState().user.isLoad).toBe(true);
    jest.advanceTimersByTime(500);

    expect(store.getState().user.isLoad).toBe(true);
    jest.advanceTimersByTime(500);

    await action;

    expect(store.getState().user.isLoad).toBe(false);

    //Проверяем, что в стейте нет информации о пользователе
    const emptyEqual: { [key: string]: string } = {};
    Object.keys(mockGet.user).forEach((key) => {
      emptyEqual[key] = '';
    });
    expect(store.getState().user.user).toEqual(emptyEqual);
  });

  test('Тест неуспешного выхода из аккаунта', async () => {
    const store = configureStore({
      reducer: {
        user: userReducer
      }
    });
    (logoutApi as jest.Mock).mockImplementation(
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

    const action = store.dispatch(logout());

    expect(store.getState().user.isLoad).toBe(true);
    jest.advanceTimersByTime(500);

    expect(store.getState().user.isLoad).toBe(true);
    jest.advanceTimersByTime(500);

    await action;

    expect(store.getState().user.isLoad).toBe(false);
    //Проверяем, что в стейте лежит ошибка
    expect(store.getState().user.errorLogout).toBe('Error');
  });
});
