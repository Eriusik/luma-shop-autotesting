const sizes = ['XS', 'S', 'M', 'L', 'XL']
const colors = ['Black', 'Blue', 'Purple']
const quantityTypes = ['1', '10', '100']

describe('add different size and different count of product to the cart from the product page', () => {
  beforeEach('open the product page', () => {
    cy.visit('https://magento-2.showcase-wallee.com/olivia-1-4-zip-light-jacket.html')
    cy.get('h1.page-title').contains('Olivia 1/4 Zip Light Jacket')
    cy.get('[data-option-label="Black"]', { timeout: 20000 }).should('be.visible') // waiting for loading options
  })
  for (const size of sizes) {
    it(`select size ${size} and add to the cart`, () => {
      cy.get(`[data-option-tooltip-value="${size}"]`).click()
      cy.get('[data-option-label="Black"]').click()
      cy.get('[id="product-addtocart-button"]').click()
      cy.get('.page.messages').should('be.visible')
      cy.get('.page.messages').contains('You added Olivia 1/4 Zip Light Jacket to your shopping cart.')
      cy.get('.counter-number').contains('1')
    })
  }
  for (const color of colors) {
    it(`select color ${color} and add to the cart`, () => {
      cy.get(`[data-option-tooltip-value="S"]`).click()
      cy.get(`[data-option-label="${color}"]`).click()
      cy.get('[id="product-addtocart-button"]').click()
      cy.get('.page.messages').should('be.visible')
      cy.get('.page.messages').contains('You added Olivia 1/4 Zip Light Jacket to your shopping cart.')
      cy.get('.counter-number').contains('1')
    })
  }
  for (const quantity of quantityTypes) {
    it(`add to the cart ${quantity} items`, () => {
      cy.get('[data-option-tooltip-value="XS"]').click()
      cy.get('[data-option-label="Black"]').click()
      cy.get('input#qty').clear().type(quantity)
      cy.get('[id="product-addtocart-button"]').click()
      cy.get('.page.messages').should('be.visible')
      cy.get('.page.messages').contains('You added Olivia 1/4 Zip Light Jacket to your shopping cart.')
      cy.get('.counter-number').contains(quantity)
    })
  }

  it(`add to the cart several times`, () => {
    cy.get('[data-option-tooltip-value="XS"]').click()
    cy.get('[data-option-label="Black"]').click()
    cy.get('input#qty').clear().type('2')
    cy.get('[id="product-addtocart-button"]').click()
    cy.get('.page.messages').should('be.visible')
    cy.get('.page.messages').contains('You added Olivia 1/4 Zip Light Jacket to your shopping cart.')
    cy.get('.counter-number').contains('2')
    cy.get('input#qty').clear().type('10')
    cy.get('[id="product-addtocart-button"]').click()
    cy.get('.page.messages').should('be.visible')
    cy.get('.page.messages').contains('You added Olivia 1/4 Zip Light Jacket to your shopping cart.')
    cy.get('.counter-number').contains('12')
  })

  describe('Negative cases', () => {
    it('size is not selected', () => {
      cy.get('[data-option-label="Black"]').click()
      cy.get('[id="product-addtocart-button"]').click()
      cy.get('.page.messages').should('not.be.visible')
      cy.get('.swatch-attribute.size > div.mage-error').contains('This is a required field.')
    })
    it('color is not selected', () => {
      cy.get('[data-option-tooltip-value="XS"]').click()
      cy.get('[id="product-addtocart-button"]').click()
      cy.get('.page.messages').should('not.be.visible')
      cy.get('.swatch-attribute.color > div.mage-error').contains('This is a required field.')
    })
    it('type decimal quantity', () => {
      cy.get('[data-option-tooltip-value="XS"]').click()
      cy.get('[data-option-label="Black"]').click()
      cy.get('input#qty').clear().type('2.2')
      cy.get('[id="product-addtocart-button"]').click()
      cy.get('.page.messages').should('be.visible').contains('You cannot use decimal quantity for this product.')
    })
    it('0 quantity', () => {
      cy.get('[data-option-tooltip-value="XS"]').click()
      cy.get('[data-option-label="Black"]').click()
      cy.get('input#qty').clear().type('0')
      cy.get('[id="product-addtocart-button"]').click()
      cy.get('.page.messages').should('not.be.visible')
      cy.get('[id="qty-error"]').should('be.visible').contains('Please enter a quantity greater than 0.')
    })
    it('type string instead quantity', () => {
      cy.get('[data-option-tooltip-value="XS"]').click()
      cy.get('[data-option-label="Black"]').click()
      cy.get('input#qty').clear().type('weft')
      cy.get('[id="product-addtocart-button"]').click()
      cy.get('.page.messages').should('not.be.visible')
      cy.get('[id="qty-error"]').should('be.visible').contains('Please enter a valid number in this field.')
    })
    it('type negative digit instead quantity', () => {
      cy.get('[data-option-tooltip-value="XS"]').click()
      cy.get('[data-option-label="Black"]').click()
      cy.get('input#qty').clear().type('-10')
      cy.get('[id="product-addtocart-button"]').click()
      cy.get('.page.messages').should('not.be.visible')
      cy.get('[id="qty-error"]').contains('Please enter a quantity greater than 0.')
    })
    it('type negative digit instead quantity', () => {
      cy.get('[data-option-tooltip-value="XS"]').click()
      cy.get('[data-option-label="Black"]').click()
      cy.get('input#qty').clear().type('101')
      cy.get('[id="product-addtocart-button"]').click()
      cy.get('.page.messages').should('be.visible').contains('The requested qty is not available')
    })
  })
})
