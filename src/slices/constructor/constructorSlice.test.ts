import {
  constructorSlice,
  addIngredient,
  deleteIngredient,
  downIngredient,
  upIngredient,
  initialState,
  constructorReducer
} from './constructorSlice';

const mockIngredients = [
  {
    _id: '643d69a5c3f7b9001cfa0941',
    id: '643d69a5c3f7b9001cfa0941',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
  },
  {
    _id: '643d69a5c3f7b9001cfa093c',
    id: '643d69a5c3f7b9001cfa093c',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
  },
  {
    _id: '643d69a5c3f7b9001cfa0945',
    id: '643d69a5c3f7b9001cfa0945',
    name: 'Соус с шипами Антарианского плоскоходца',
    type: 'sauce',
    proteins: 101,
    fat: 99,
    carbohydrates: 100,
    calories: 100,
    price: 88,
    image: 'https://code.s3.yandex.net/react/code/sauce-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-01-large.png'
  }
];

const afterUpIngredients = [
  mockIngredients[1],
  mockIngredients[0],
  mockIngredients[2]
];

const afterDownIngredients = [
  mockIngredients[0],
  mockIngredients[2],
  mockIngredients[1]
];

describe('Тест конструктора', () => {
  test('Тест добавления ингредиента', () => {
    const action = constructorReducer(
      initialState,
      addIngredient(mockIngredients[0])
    );
    //Для id ставим любое значение, поскольку в addIngredient для id используется бибилотека uuid
    expect(action.ingredients).toEqual([
      { ...mockIngredients[0], id: expect.any(String) }
    ]);
  });

  test('Тест удаления ингредиента', () => {
    const action = constructorReducer(
      initialState,
      deleteIngredient(mockIngredients[0])
    );
    expect(action.ingredients).toEqual([]);
  });

  test('Тест перемещения ингредиента вверх', () => {
    const action = constructorReducer(
      { ...initialState, ingredients: mockIngredients },
      upIngredient(mockIngredients[1])
    );
    expect(action.ingredients).toEqual(afterUpIngredients);
  });

  test('Тест перемещения ингредиента вниз', () => {
    const action = constructorReducer(
      { ...initialState, ingredients: mockIngredients },
      downIngredient(mockIngredients[1])
    );
    expect(action.ingredients).toEqual(afterDownIngredients);
  });
});
