beforeEach(()=>{
  cy.intercept('GET', 'api/ingredients',
    {
      fixture: 'ingredients.json',
      statusCode: 200,
    }
  ).as('getIngredients');
})

describe('Тестирование оформления заказа', ()=>{
  it('Тестирование добавления ингредиентов в конструктор', ()=>{
    cy.visit('http://localhost:4000');
    cy.wait('@getIngredients');
    const ingredientIdBun = "643d69a5c3f7b9001cfa093c";
    const ingredientIdMain = "643d69a5c3f7b9001cfa0943";

    const classNameBun = `ingredients-addButton-${ingredientIdBun}`;
    const classNameMain = `ingredients-addButton-${ingredientIdMain}`
    
    const AddButtonBun = cy.get(`.${classNameBun}`).should('exist');
    const AddButtonMain = cy.get(`.${classNameMain}`).should('exist');

    //Нажимаем на кнопки добавления ингредиентов
    AddButtonBun.click();
    AddButtonMain.click();

    const dataCyBunTop = `constructor-element-bun-top-${ingredientIdBun}`;
    const dataCyBunBottom = `constructor-element-bun-bottom-${ingredientIdBun}`;
    const dataCyMain = `constructor-element-${ingredientIdMain}`;

    //Проверяем наличие нажатых ранее ингредиентов в конструкторе
    const ConstructorElementBunTop = cy.get(`[data-cy=${dataCyBunTop}]`);
    ConstructorElementBunTop.should('exist');
    const ConstructorElementBunBottom = cy.get(`[data-cy=${dataCyBunBottom}]`);
    ConstructorElementBunBottom.should('exist');
    const ConstructorElementMain = cy.get(`[data-cy=${dataCyMain}]`);
    ConstructorElementMain.should('exist');
  })

  it('Тестирование модального окна ингредиента', ()=>{
    cy.visit('http://localhost:4000');
    cy.wait('@getIngredients');
    const testIngredientId = "643d69a5c3f7b9001cfa093c";
    
    const classNameIngredient = `ingredients-link-${testIngredientId}`;

    const IngredientLink = cy.get(`.${classNameIngredient}`).should('exist');

    IngredientLink.click();

    const modal = cy.get('[data-cy=modal]');
    //Проверяем наличие модального окна
    modal.should('exist');

    const modalContent = modal.find(`[data-cy=ingredient-detail-${testIngredientId}]`);
    //Проверяем наличие данного ингредиента модального окна
    modalContent.should('exist');

    //Проверяем наличие кнопки закрытия модального окна
    const buttonClose = cy.get('[data-cy=modal-close-button]').should('exist');
    buttonClose.click();

    //Проверяем, что окна больше нет
    modal.should('not.exist');
    //Проверяем, что контента больше нет
    modalContent.should('not.exist');
  })
})