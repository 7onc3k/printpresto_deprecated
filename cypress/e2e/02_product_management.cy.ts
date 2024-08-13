describe('Správa produktů', () => {
  beforeEach(() => {
    // Přihlášení jako admin před každým testem
    cy.visit('/employee/login');
    cy.get('[data-cy=employee-login-email]').type('admin@example.com');
    cy.get('[data-cy=employee-login-password]').type('adminPassword123');
    cy.get('[data-cy=employee-login-submit]').click();
  });
  it('Přidání nového produktu', () => {
    cy.visit('/employee/products/add');
    cy.get('[data-cy=product-name]').type('Nový produkt');
    cy.get('[data-cy=product-description]').type('Popis nového produktu');
    cy.get('[data-cy=product-price]').type('100');
    cy.get('[data-cy=product-image]').attachFile('test-image.jpg');
    cy.get('[data-cy=product-submit]').click();
    cy.contains('Produkt byl úspěšně přidán').should('be.visible');
  });
  it('Editace existujícího produktu', () => {
    cy.visit('/employee/products');
    cy.get('[data-cy=edit-product]').first().click();
    cy.get('[data-cy=product-name]').clear().type('Upravený produkt');
    cy.get('[data-cy=product-submit]').click();
    cy.contains('Produkt byl úspěšně aktualizován').should('be.visible');
  });
  it('Smazání produktu', () => {
    cy.visit('/employee/products');
    cy.get('[data-cy=delete-product]').first().click();
    cy.get('[data-cy=confirm-delete]').click();
    cy.contains('Produkt byl úspěšně smazán').should('be.visible');
  });
});