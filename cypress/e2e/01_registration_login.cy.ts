describe('Registrace a přihlášení', () => {
  it('Registrace zákazníka', () => {
    cy.visit('/register');
    const email = `test${Date.now()}@example.com`;
    const password = 'testPassword123';
    cy.get('[data-cy=register-email]').type(email);
    cy.get('[data-cy=register-password]').type(password);
    cy.get('[data-cy=register-submit]').click();
    cy.url().should('include', '/login');
    cy.contains('Registrace proběhla úspěšně').should('be.visible');
  });
  it('Přihlášení zákazníka', () => {
    cy.visit('/login');
    cy.get('[data-cy=login-email]').type('customer@example.com');
    cy.get('[data-cy=login-password]').type('customerPassword123');
    cy.get('[data-cy=login-submit]').click();
    cy.url().should('include', '/profile');
    cy.contains('Vítejte').should('be.visible');
  });
  it('Přihlášení zaměstnance', () => {
    cy.visit('/employee/login');
    cy.get('[data-cy=employee-login-email]').type('employee@example.com');
    cy.get('[data-cy=employee-login-password]').type('employeePassword123');
    cy.get('[data-cy=employee-login-submit]').click();
    cy.url().should('include', '/employee/dashboard');
    cy.contains('Dashboard zaměstnance').should('be.visible');
  });
});