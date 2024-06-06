const sizes = ['XS', 'S', 'M', 'L', 'XL']
const colors = ['Black', 'Blue', 'Purple']
const quantityTypes = ['1', '10', '100']

describe('Add different size and different count of product to the cart from the product page', () => {
  beforeEach('open the product page', () => {
    cy.visit('https://magento-2.showcase-wallee.com/olivia-1-4-zip-light-jacket.html')
    cy.get('h1.page-title').contains('Olivia 1/4 Zip Light Jacket')
    cy.get('[data-option-label="Black"]', { timeout: 20000 }).should('be.visible') // waiting for loading options
  })
  describe('Test 1 - Check product options on the product page', () => {
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
      it(`Test 1 - select color ${color} and add to the cart`, () => {
        cy.get(`[data-option-tooltip-value="S"]`).click()
        cy.get(`[data-option-label="${color}"]`).click()
        cy.get('[id="product-addtocart-button"]').click()
        cy.get('.page.messages').should('be.visible')
        cy.get('.page.messages').contains('You added Olivia 1/4 Zip Light Jacket to your shopping cart.')
        cy.get('.counter-number').contains('1')
      })
    }
    it('Negative case - size is not selected', () => {
      cy.get('[data-option-label="Black"]').click()
      cy.get('[id="product-addtocart-button"]').click()
      cy.get('.page.messages').should('not.be.visible')
      cy.get('.swatch-attribute.size > div.mage-error').contains('This is a required field.')
    })
    it('Negative case - color is not selected', () => {
      cy.get('[data-option-tooltip-value="XS"]').click()
      cy.get('[id="product-addtocart-button"]').click()
      cy.get('.page.messages').should('not.be.visible')
      cy.get('.swatch-attribute.color > div.mage-error').contains('This is a required field.')
    })
  })
  describe('Test 2 - Add to the cart different quantity of the product', () => {
    for (const quantity of quantityTypes) {
      it(`Test 2 - add to the cart ${quantity} items`, () => {
        cy.get('[data-option-tooltip-value="XS"]').click()
        cy.get('[data-option-label="Black"]').click()
        cy.get('input#qty').clear().type(quantity)
        cy.get('[id="product-addtocart-button"]').click()
        cy.get('.page.messages').should('be.visible')
        cy.get('.page.messages').contains('You added Olivia 1/4 Zip Light Jacket to your shopping cart.')
        cy.get('.counter-number').contains(quantity)
      })
    }
    it('Negative case - type decimal quantity', () => {
      cy.get('[data-option-tooltip-value="XS"]').click()
      cy.get('[data-option-label="Black"]').click()
      cy.get('input#qty').clear().type('2.2')
      cy.get('[id="product-addtocart-button"]').click()
      cy.get('.page.messages').should('be.visible').contains('You cannot use decimal quantity for this product.')
    })
    it('Negative case - 0 quantity', () => {
      cy.get('[data-option-tooltip-value="XS"]').click()
      cy.get('[data-option-label="Black"]').click()
      cy.get('input#qty').clear().type('0')
      cy.get('[id="product-addtocart-button"]').click()
      cy.get('.page.messages').should('not.be.visible')
      cy.get('[id="qty-error"]').should('be.visible').contains('Please enter a quantity greater than 0.')
    })
    it('Negative case - type string instead quantity', () => {
      cy.get('[data-option-tooltip-value="XS"]').click()
      cy.get('[data-option-label="Black"]').click()
      cy.get('input#qty').clear().type('weft')
      cy.get('[id="product-addtocart-button"]').click()
      cy.get('.page.messages').should('not.be.visible')
      cy.get('[id="qty-error"]').should('be.visible').contains('Please enter a valid number in this field.')
    })
    it('Negative case - type negative digit instead quantity', () => {
      cy.get('[data-option-tooltip-value="XS"]').click()
      cy.get('[data-option-label="Black"]').click()
      cy.get('input#qty').clear().type('-10')
      cy.get('[id="product-addtocart-button"]').click()
      cy.get('.page.messages').should('not.be.visible')
      cy.get('[id="qty-error"]').contains('Please enter a quantity greater than 0.')
    })
    it('Negative case - type negative digit instead quantity', () => {
      cy.get('[data-option-tooltip-value="XS"]').click()
      cy.get('[data-option-label="Black"]').click()
      cy.get('input#qty').clear().type('101')
      cy.get('[id="product-addtocart-button"]').click()
      cy.get('.page.messages').should('be.visible').contains('The requested qty is not available')
    })
  })

  it(`Test 3 - add to the cart several times`, () => {
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
})
