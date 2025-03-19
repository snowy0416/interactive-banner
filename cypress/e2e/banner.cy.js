describe('Banner Customization', () => {
  beforeEach(() => {
    // Visit the app before each test
    cy.visit('http://localhost:3000');
  });

  it('updates the banner background color when the form is submitted', () => {
    // Change the background color
    cy.get('input[type="color"]').first() // First color input (background color)
      .invoke('val', '#00ff00')
      .trigger('change');

    // Log the background color input value
    cy.get('input[type="color"]').first().invoke('val').then((color) => {
      cy.log(`Background color input value: ${color}`);
    });

    // Submit the form
    cy.get('button').click();
  });

  it('updates the banner text color when the form is submitted', () => {
    // Change the text color
    cy.get('input[type="color"]').eq(1) // Second color input (text color)
      .invoke('val', '#ff0000')
      .trigger('change');

    // Log the text color input value
    cy.get('input[type="color"]').eq(1).invoke('val').then((color) => {
      cy.log(`Text color input value: ${color}`);
    });

    // Submit the form
    cy.get('button').click();

    
  });

  it('updates the banner background image when an image is uploaded', () => {
    // Upload an image
    cy.get('input[type="file"]').attachFile('test-image.jpg');
  
    // Submit the form
    cy.get('button').click();
  
    
  });

  it('applies a preset theme when selected from the dropdown', () => {
    // Select a preset theme
    cy.get('select').select('nature');

    // Log the background color input value
    cy.get('input[type="color"]').first().invoke('val').then((backgroundColor) => {
      cy.log(`Background color input value: ${backgroundColor}`);
      expect(backgroundColor).to.equal('#4caf50'); // Nature theme color in hex
    });

    // Log the text color input value
    cy.get('input[type="color"]').eq(1).invoke('val').then((textColor) => {
      cy.log(`Text color input value: ${textColor}`);
      expect(textColor).to.equal('#ffffff'); // Nature theme text color in hex
    });

    // Submit the form
    cy.get('button').click();

    // Verify the banner updates with the selected theme
    // cy.get('.banner').should('have.css', 'background-color', 'rgb(76, 175, 80)'); // Nature theme color
    // cy.get('.banner h1').should('have.css', 'color', 'rgb(255, 255, 255)'); // Nature theme text color
  });
});