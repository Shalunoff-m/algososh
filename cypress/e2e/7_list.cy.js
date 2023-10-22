import { CIRCLE_BOX, BASE_URL } from '../constant/constant';

describe("Тесты на функциональность страницы 'Лист'", function () {
  beforeEach(function () {
    cy.visit(BASE_URL);
    cy.get("[href='/list']").click();
    cy.location('pathname').should('eq', '/list');
    cy.get("input[placeholder='Введите текст']").as('inputText');
    cy.get("input[placeholder='Введите индекс']").as('inputIndex');
    cy.get('button').eq(1).as('addBtnHead');
    cy.get('button').eq(2).as('addBtnTail');
    cy.get('button').eq(3).as('removeBtnHead');
    cy.get('button').eq(4).as('removeBtnTail');
    cy.get('button').eq(5).as('addBtnIndex');
    cy.get('button').eq(6).as('removeBtnIndex');
    cy.get(CIRCLE_BOX).as('circles');
  });

  it('Корректное отображение кнопок при пустом инпуте', function () {
    cy.get('@inputText').should('be.empty');
    cy.get('@inputIndex').should('be.empty');
    cy.get('@addBtnHead').should('be.disabled');
    cy.get('@addBtnTail').should('be.disabled');
    cy.get('@addBtnIndex').should('be.disabled');
    cy.get('@removeBtnIndex').should('be.disabled');
    cy.get('@removeBtnHead').should('be.enabled');
    cy.get('@removeBtnTail').should('be.enabled');
  });
});
