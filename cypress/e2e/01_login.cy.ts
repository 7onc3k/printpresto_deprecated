/* ==== Test Created with Cypress Studio ==== */
it('pokus_1', function() {
  /* ==== Generated with Cypress Studio ==== */
  cy.visit('localhost:3000');
  cy.wait(2000); // Čekání po načtení stránky
  cy.get('span').click();

  cy.get('[type="email"]').type('thanhanantony@gmail.com');

  cy.get('[type="password"]').type('tonda2002');
  cy.get('form > button').click();
  cy.wait(3000); // Čekání po přihlášení
  cy.get('span').click();
  /* ==== End Cypress Studio ==== */
  /* ==== Generated with Cypress Studio ==== */
  cy.get('[style="background-color: white; padding: 20px; border-radius: 5px; max-width: 80%; max-height: 80%; overflow: auto;"] > :nth-child(7)').click();
  /* ==== End Cypress Studio ==== */
  /* ==== Generated with Cypress Studio ==== */
  cy.get('button').click();
  cy.wait(2000); // Čekání po kliknutí na tlačítko
  cy.get(':nth-child(1) > a > button').click();
  cy.wait(5000); // Čekání po kliknutí na další tlačítko
  cy.get('input').click();
  cy.get('.upper-canvas').click();
  cy.get('.upper-canvas').click();
  cy.get('.upper-canvas').click();
  cy.get('[alt="Náhled view_3"]').click();
  cy.wait(2000); // Čekání po kliknutí na náhled
  cy.get('input').click();
  cy.get('.upper-canvas').click();
  cy.get('[style="position: relative;"] > :nth-child(2) > :nth-child(4)').click();
  /* ==== End Cypress Studio ==== */
  cy.wait(2000); // Čekání před návratem na domovskou stránku
  cy.visit('/')
  /* ==== Generated with Cypress Studio ==== */
  cy.get('span').click();
  cy.get('ul > :nth-child(2) > button').click();
  cy.get('[style="background-color: white; padding: 20px; border-radius: 5px; max-width: 80%; max-height: 80%; overflow: auto;"] > :nth-child(7)').click();
  cy.get('[style="position: relative;"] > :nth-child(2) > :nth-child(5)').click();
  cy.get('[style="position: relative;"] > :nth-child(2) > :nth-child(6)').click();
  cy.get('button').click();
  /* ==== End Cypress Studio ==== */
});