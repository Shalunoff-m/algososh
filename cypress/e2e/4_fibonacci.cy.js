import { BASE_URL, CIRCLE_BOX } from '../constant/constant';

describe('Тестирование Алгоритма на странице Фибоначи', function () {
  beforeEach(function () {
    cy.visit(BASE_URL);
    cy.get("[href='/fibonacci']").click();
    cy.location('pathname').should('eq', '/fibonacci');
  });

  it('Кнопка выкл при пустом инпуте', function () {
    cy.get('input').should('have.value', '');
    cy.get('button').eq(1).should('be.disabled');
  });

  it('Алгоритм построения чисел Фибоначи работает корректно', function () {
    const expectedFibonacciValues = ['1', '1', '2', '3', '5', '8'];

    // Вводим значение
    cy.get('input').type(5);

    // Запускаем алгоритм
    cy.get('button').eq(1).click();

    // Ожидаем, что количество элементов соответствует длине ожидаемого массива
    cy.get(CIRCLE_BOX)
      .as('circles')
      .should('have.length', expectedFibonacciValues.length);

    // Проверяем каждый элемент на соответствие его значению в массиве
    cy.get('@circles').each((circle, index) => {
      cy.wrap(circle).contains(expectedFibonacciValues[index]);
    });
  });
});
