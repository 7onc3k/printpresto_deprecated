describe('Interakce zákazníka s produkty', () => {
  beforeEach(() => {
    // Přihlášení jako zákazník před každým testem
    cy.visit('/login');
    cy.get('[data-cy=login-email]').type('customer@example.com');
    cy.get('[data-cy=login-password]').type('customerPassword123');
    cy.get('[data-cy=login-submit]').click();
  });
  it('Prohlížení seznamu produktů', () => {
    cy.visit('/products');
    cy.get('[data-cy=product-card]').should('have.length.at.least', 1);
  });
  it('Zobrazení detailu produktu', () => {
    cy.visit('/products');
    cy.get('[data-cy=product-card]').first().click();
    cy.get('[data-cy=product-detail]').should('be.visible');
  });
  it('Návrh designu produktu', () => {
    cy.visit('/products');
    cy.get('[data-cy=product-card]').first().click();
    cy.get('[data-cy=customize-product]').click();
    cy.get('[data-cy=upload-image]').attachFile('custom-design.jpg');
    cy.get('[data-cy=design-canvas]').click(50, 50);
    cy.get('[data-cy=save-design]').click();
    cy.contains('Design byl úspěšně uložen').should('be.visible');
  });
  it('Přidání produktu do košíku', () => {
    cy.visit('/products');
    cy.get('[data-cy=product-card]').first().click();
    cy.get('[data-cy=add-to-cart]').click();
    cy.get('[data-cy=cart-count]').should('contain', '1');
  });
});