import './commands'
import 'cypress-file-upload'

declare global {
  namespace Cypress {
    interface Chainable {
      attachFile(filePath: string): Chainable<JQuery<HTMLElement>>
    }
  }
}
