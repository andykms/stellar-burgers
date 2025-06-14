


beforeEach(()=>{
  cy.intercept('GET', 'https://norma.nomoreparties.space/api/ingredients',
    {
      fixture: 'ingredients.json',
      statusCode: 200,
    }
  ).as('getIngredients');
})

describe('Тестирование оформления заказа', ()=>{
  it('Тестирование оформления заказа', ()=>{
    cy.visit('http://localhost:4000');
  })
})