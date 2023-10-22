import { BASE_URL } from '../constant/constant';

describe('Проверка роутинга', function () {
  beforeEach(function () {
    cy.visit(BASE_URL);
  });
  it('Разворот строки доступен', function () {
    cy.get("[href='/recursion']").click();
    cy.location('pathname').should('eq', '/recursion');
    cy.contains('Строка');
    cy.contains('К оглавлению').click();
    cy.location('pathname').should('eq', '/');
    cy.contains('Вдохновлено школами, в которых не учили алгоритмам');
  });
});
