beforeEach(()=>{
  cy.intercept('GET', 'api/ingredients',
    {
      fixture: 'ingredients.json',
      statusCode: 200,
    }
  ).as('getIngredients');
})

describe('Тестирование оформления заказа', ()=>{
  it('Тестирование добавления ингредиентов в конструктор', async ()=>{
    cy.visit('http://localhost:4000');
    await cy.wait('@getIngredients').then((data)=>{
      console.log(data)
    })
    const ingredientIdBun = "643d69a5c3f7b9001cfa093c";
    const ingredientIdMain = "643d69a5c3f7b9001cfa0943";

    const classNameBun = `ingredients-addButton-${ingredientIdBun}`;
    const classNameMain = `ingredients-addButton-${ingredientIdMain}`
    
    const AddButtonBun = cy.get(`.${classNameBun}`);
    const AddButtonMain = cy.get(`.${classNameMain}`);

    //Нажимаем на кнопки добавления ингредиентов
    AddButtonBun.click();
    AddButtonMain.click();

    const dataCyBunTop = `constructor-element-bun-top-${ingredientIdBun}`;
    const dataCyBunBottom = `constructor-element-bun-bottom-${ingredientIdBun}`;
    const dataCyMain = `constructor-element-${ingredientIdMain}`;

    //Проверяем наличие нажатых ранее ингредиентов в конструкторе
    const ConstructorElementBunTop = cy.get(`[data-cy=${dataCyBunTop}]`);
    const ConstructorElementBunBottom = cy.get(`[data-cy=${dataCyBunBottom}]`);
    const ConstructorElementMain = cy.get(`[data-cy=${dataCyMain}]`);
  })
})