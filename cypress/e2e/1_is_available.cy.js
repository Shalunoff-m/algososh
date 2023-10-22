import { BASE_URL } from './../constant/constant';

describe('Подняться ... надо просто подняться, ... подняться', function () {
  it(`Сервис запущен на ${BASE_URL}`, function () {
    cy.visit(BASE_URL);
  });
});
