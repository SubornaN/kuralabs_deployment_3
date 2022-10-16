describe('Heading', () => {
    it('has the right title', () => {
        cy.visit('http://54.144.111.183:5000')

        cy.get('title')
            .invoke('text')
            .should("equal", "URL Shortener")
    });

});
