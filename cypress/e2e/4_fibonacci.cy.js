import { BASE_URL } from '../constant/constant';

describe('Переход на страницу Фибоначи работает корректно', function () {
  beforeEach(function () {
    cy.visit(BASE_URL);
    cy.get("[href='/fibonacci']").click();
    cy.location('pathname').should('eq', '/fibonacci');
  });

  it('Кнопка выкл при пустом инпуте', function () {
    cy.get('input').should('have.value', '');
    cy.get('button').eq(1).should('be.disabled');
  });
});
