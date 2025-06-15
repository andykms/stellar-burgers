import {setCookie} from '../../../src/utils/cookie';

beforeEach(() => {
  cy.intercept('GET', 'api/ingredients', {
    fixture: 'ingredients.json',
    statusCode: 200
  }).as('getIngredients');

  cy.intercept('POST', 'api/auth/login', {
    fixture: 'login.json',
    statusCode: 200
  }).as('login');

  cy.intercept('GET', 'api/auth/user', {
    fixture: 'getUser.json',
    statusCode: 200
  }).as('getUser');

  cy.intercept('POST', 'api/orders', {
    fixture: 'postOrder.json',
    statusCode: 200
  }).as('postOrder');
});

describe('Тестирование оформления заказа', () => {
  it('Тестирование добавления ингредиентов в конструктор', () => {
    cy.visit('http://localhost:4000');
    cy.wait('@getIngredients');
    const ingredientIdBun = '643d69a5c3f7b9001cfa093c';
    const ingredientIdMain = '643d69a5c3f7b9001cfa0943';

    const classNameBun = `ingredients-addButton-${ingredientIdBun}`;
    const classNameMain = `ingredients-addButton-${ingredientIdMain}`;

    const AddButtonBun = cy.get(`.${classNameBun}`).should('exist');
    const AddButtonMain = cy.get(`.${classNameMain}`).should('exist');

    //Нажимаем на кнопки добавления ингредиентов
    AddButtonBun.click();
    AddButtonMain.click();

    const dataCyBunTop = `constructor-element-bun-top-${ingredientIdBun}`;
    const dataCyBunBottom = `constructor-element-bun-bottom-${ingredientIdBun}`;
    const dataCyMain = `constructor-element-${ingredientIdMain}`;

    //Проверяем наличие нажатых ранее ингредиентов в конструкторе
    const ConstructorElementBunTop = cy.get(`.${dataCyBunTop}`);
    ConstructorElementBunTop.should('exist');
    const ConstructorElementBunBottom = cy.get(`.${dataCyBunBottom}`);
    ConstructorElementBunBottom.should('exist');
    const ConstructorElementMain = cy.get(`.${dataCyMain}`);
    ConstructorElementMain.should('exist');
  });

  it('Тестирование модального окна ингредиента', () => {
    cy.visit('http://localhost:4000');
    cy.wait('@getIngredients');
    const testIngredientId = '643d69a5c3f7b9001cfa093c';

    const classNameIngredient = `ingredients-link-${testIngredientId}`;

    const IngredientLink = cy.get(`.${classNameIngredient}`).should('exist');

    IngredientLink.click();

    const modal = cy.get('[data-cy=modal]');
    //Проверяем наличие модального окна
    modal.should('exist');

    const modalContent = modal.find(
      `[data-cy=ingredient-detail-${testIngredientId}]`
    );
    //Проверяем наличие данного ингредиента модального окна
    modalContent.should('exist');

    //Проверяем наличие кнопки закрытия модального окна
    const buttonClose = cy.get('[data-cy=modal-close-button]').should('exist');
    buttonClose.click();

    //Проверяем, что окна больше нет
    modal.should('not.exist');
    //Проверяем, что контента больше нет
    modalContent.should('not.exist');
  });

  it('Тестирование процесса заказа', () => {
    cy.visit('http://localhost:4000');
    cy.wait('@getIngredients');

    setCookie('accessToken', '12345678');
    localStorage.setItem('refreshToken', '87654321');
    cy.wait('@getUser');

    const ingredientIdBun = '643d69a5c3f7b9001cfa093c';
    const ingredientIdMain = '643d69a5c3f7b9001cfa0943';

    const classNameBun = `ingredients-addButton-${ingredientIdBun}`;
    const classNameMain = `ingredients-addButton-${ingredientIdMain}`;

    const AddButtonBun = cy.get(`.${classNameBun}`).should('exist');
    const AddButtonMain = cy.get(`.${classNameMain}`).should('exist');

    //Нажимаем на кнопки добавления ингредиентов
    AddButtonBun.click();
    AddButtonMain.click();
    
    const newButtonOrder = cy.get('.constructor-order-button');
    //Проверяем наличие кнопки заказа на странице
    newButtonOrder.should('exist');

    newButtonOrder.click();

    cy.wait('@postOrder');

    const modal = cy.get('[data-cy=modal]');
    //Проверяем наличие модального окна
    modal.should('exist');

    const orderNumber = modal.find(`[data-cy=order-number]`);
    //Проверяем наличие номера заказа в модальном окне
    orderNumber.should('exist');

    //Проверяем, что номер заказа такой же, как в моковом ответе
    orderNumber.should('have.text', '12345');

    const buttonClose = cy.get('[data-cy=modal-close-button]').should('exist');
    buttonClose.click();

    //Проверяем, что окна больше нет
    modal.should('not.exist');

    const ClassNameBunTop = `constructor-element-bun-top`;
    const ClassNameBunBottom = `constructor-element-bun-bottom`;
    const ClassNameCyMain = `constructor-element-main`;

    const bunTop = cy.get(`.${ClassNameBunTop}`);
    //Верхней булки не должно быть
    bunTop.should('not.exist');
    const bunBottom = cy.get(`.${ClassNameBunBottom}`);
    //Нижней булки не должно быть
    bunBottom.should('not.exist');
    const main = cy.get(`.${ClassNameCyMain}`);
    //Начинок не должно быть
    main.should('not.exist');
  });
});
