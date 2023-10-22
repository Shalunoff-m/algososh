import { BASE_URL } from '../constant/constant';

describe("Переход на страницу 'Строка' выполняется корректно", function () {
  beforeEach(function () {
    cy.visit(BASE_URL);
    cy.get("[href='/recursion']").click();
    cy.location('pathname').should('eq', '/recursion');
  });

  it('Проверка доступности кнопки при пустом инпуте', function () {
    cy.get('input').should('have.value', '');
    cy.get('button').eq(1).should('be.disabled');
  });
});
