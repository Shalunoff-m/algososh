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
  it('Фибоначи доступно', function () {
    cy.get("[href='/fibonacci']").click();
    cy.location('pathname').should('eq', '/fibonacci');
    cy.contains('Последовательность Фибоначчи');
    cy.contains('К оглавлению').click();
    cy.location('pathname').should('eq', '/');
    cy.contains('Вдохновлено школами, в которых не учили алгоритмам');
  });
  it('Сортировка массива доступна', function () {
    cy.get("[href='/sorting']").click();
    cy.location('pathname').should('eq', '/sorting');
    cy.contains('Сортировка массива');
    cy.contains('К оглавлению').click();
    cy.location('pathname').should('eq', '/');
    cy.contains('Вдохновлено школами, в которых не учили алгоритмам');
  });
  it('Стек доступен для перехода', function () {
    cy.get("[href='/stack']").click();
    cy.location('pathname').should('eq', '/stack');
    cy.contains('Стек');
    cy.contains('К оглавлению').click();
    cy.location('pathname').should('eq', '/');
    cy.contains('Вдохновлено школами, в которых не учили алгоритмам');
  });
  it('Очередь доступна для перехода', function () {
    cy.get("[href='/queue']").click();
    cy.location('pathname').should('eq', '/queue');
    cy.contains('Очередь');
    cy.contains('К оглавлению').click();
    cy.location('pathname').should('eq', '/');
    cy.contains('Вдохновлено школами, в которых не учили алгоритмам');
  });
});
