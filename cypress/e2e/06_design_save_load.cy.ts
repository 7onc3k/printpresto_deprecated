describe('Uložení a načtení designu', () => {
  beforeEach(() => {
    // Přihlášení jako zákazník před každým testem
    cy.visit('/login');
    cy.get('[data-cy=login-email]').type('customer@example.com');
    cy.get('[data-cy=login-password]').type('customerPassword123');
    cy.get('[data-cy=login-submit]').click();
  });
  it('Uložení designu do profilu uživatele', () => {
    cy.visit('/products');
    cy.get('[data-cy=product-card]').first().click();
    cy.get('[data-cy=customize-product]').click();
    cy.get('[data-cy=upload-image]').attachFile('custom-design.jpg');
    cy.get('[data-cy=design-canvas]').click(50, 50);
    cy.get('[data-cy=save-design]').click();
    cy.contains('Design byl úspěšně uložen').should('be.visible');
  });
  it('Načtení uloženého designu z profilu uživatele', () => {
    cy.visit('/profile');
    cy.get('[data-cy=saved-designs]').should('be.visible');
    cy.get('[data-cy=load-design]').first().click();
    cy.get('[data-cy=design-canvas]').should('be.visible');
    cy.get('[data-cy=uploaded-image]').should('be.visible');
  });
});