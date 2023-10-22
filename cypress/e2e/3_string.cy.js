import {
  BASE_URL,
  CIRCLE_CHANGING,
  CIRCLE_DEFAULT,
  CIRCLE_MODIFIED,
  CIRCLE_BOX,
} from '../constant/constant';

import { SHORT_DELAY_IN_MS } from '../../src/constants/delays';

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

  it('Проверка корректности разворота строки', function () {
    function checkInitialStateOfCircles() {
      cy.get('@circles').each((el, index) => {
        const expectedText = index + 1;
        cy.wrap(el).contains(expectedText);

        const expectedCircleSelector =
          index === 0 || index === 4 ? CIRCLE_CHANGING : CIRCLE_DEFAULT;
        cy.wrap(el).get(expectedCircleSelector).contains(expectedText);
      });
    }

    function checkFinalStateOfCircles() {
      cy.get('@circles').each((el, index) => {
        const expectedText = 5 - index;
        cy.wrap(el).contains(expectedText);
        cy.wrap(el).get(CIRCLE_MODIFIED);
      });
    }
    // Вводим строку
    cy.get('input').type(12345);

    // Запускаем алгоритм
    cy.get('button').eq(1).click();
    cy.wait(SHORT_DELAY_IN_MS);

    // Ожидаем, что будет 5 кругов
    cy.get(CIRCLE_BOX).as('circles').should('have.length', 5);
    cy.wait(SHORT_DELAY_IN_MS);

    // Проверяем начальное состояние кругов
    checkInitialStateOfCircles();

    cy.wait(SHORT_DELAY_IN_MS);

    // Проверяем конечное состояние кругов
    checkFinalStateOfCircles();
  });
});
