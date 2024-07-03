/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject> {
    attachFile(filePath: string): Chainable<Subject>
  }
}