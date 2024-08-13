describe('Košík a dokončení objednávky', () => {
  beforeEach(() => {
    // Přihlášení jako zákazník a přidání produktu do košíku
    cy.visit('/login');
    cy.get('[data-cy=login-email]').type('customer@example.com');
    cy.get('[data-cy=login-password]').type('customerPassword123');
    cy.get('[data-cy=login-submit]').click();
    cy.visit('/products');
    cy.get('[data-cy=product-card]').first().click();
    cy.get('[data-cy=add-to-cart]').click();
  });
  it('Úprava množství produktu v košíku', () => {
    cy.visit('/cart');
    cy.get('[data-cy=quantity-input]').clear().type('2');
    cy.get('[data-cy=update-quantity]').click();
    cy.get('[data-cy=cart-total]').should('contain', '200');
  });
  it('Odstranění produktu z košíku', () => {
    cy.visit('/cart');
    cy.get('[data-cy=remove-product]').click();
    cy.contains('Košík je prázdný').should('be.visible');
  });
  it('Dokončení objednávky', () => {
    cy.visit('/cart');
    cy.get('[data-cy=proceed-to-checkout]').click();
    cy.get('[data-cy=shipping-address]').type('123 Test Street, Test City, 12345');
    cy.get('[data-cy=payment-method]').select('credit_card');
    cy.get('[data-cy=card-number]').type('4111111111111111');
    cy.get('[data-cy=card-expiry]').type('12/25');
    cy.get('[data-cy=card-cvc]').type('123');
    cy.get('[data-cy=place-order]').click();
    cy.contains('Objednávka byla úspěšně dokončena').should('be.visible');
  });
});