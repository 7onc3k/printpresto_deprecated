describe('Správa objednávek zaměstnancem', () => {
  beforeEach(() => {
    // Přihlášení jako zaměstnanec před každým testem
    cy.visit('/employee/login');
    cy.get('[data-cy=employee-login-email]').type('employee@example.com');
    cy.get('[data-cy=employee-login-password]').type('employeePassword123');
    cy.get('[data-cy=employee-login-submit]').click();
  });
  it('Zobrazení seznamu objednávek', () => {
    cy.visit('/employee/orders');
    cy.get('[data-cy=order-item]').should('have.length.at.least', 1);
  });
  it('Zobrazení detailu objednávky', () => {
    cy.visit('/employee/orders');
    cy.get('[data-cy=order-item]').first().click();
    cy.get('[data-cy=order-detail]').should('be.visible');
  });
  it('Změna stavu objednávky', () => {
    cy.visit('/employee/orders');
    cy.get('[data-cy=order-item]').first().click();
    cy.get('[data-cy=order-status]').select('processing');
    cy.get('[data-cy=update-status]').click();
    cy.contains('Stav objednávky byl aktualizován').should('be.visible');
  });
});