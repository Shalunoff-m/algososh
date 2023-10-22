import { BASE_URL } from '../constant/constant';

describe('Страница Стек работает корректно', function () {
  beforeEach(function () {
    cy.visit(BASE_URL);
    cy.get("[href='/stack']").click();
    cy.location('pathname').should('eq', '/stack');
  });
  it('Кнопки выкл при пустом инпуте', function () {
    cy.get('input').should('have.value', '');
    cy.get('button').eq(1).should('be.disabled');
    cy.get('button').eq(2).should('be.disabled');
    cy.get('button').eq(3).should('be.disabled');
  });
});
