describe('Login flow', () => {
    const loginEndpoint = 'http://localhost:3000/login';
    beforeEach(() => {
        cy.visit(loginEndpoint);
        cy.get('[name="email"]').as("emailInput");
        cy.get('[name="password"]').as("passwordInput")
    })
    const existingEmail = 'maria@gmail.com';
    const unregisteredEmail = 'wrong@email.com';
    const password = 'password';

    it('form with email and password inputs appears', () => {
        cy.get("@emailInput").should('exist');
        cy.get("@passwordInput").should('exist')
    });

    it('upon login, registered user is redirected to their own workspace', () => {
        cy.get("@emailInput").type(existingEmail);
        cy.get("@passwordInput").type(password);
        // cy.get('[id="login_button"]').as("loginButton").click();
        cy.get('button').contains('LOGIN').click(); //alternative way to identify the button
        cy.url().should('include', '/workspace');
    });

    it('should return 401 if unregistered email tries to login', () => {
        cy.intercept('POST', '/login').as('loginRequest');
        cy.get("@emailInput").type(unregisteredEmail);
        cy.get("@passwordInput").type(password);
        cy.get('button').contains('LOGIN').click();
        // cuando se incluya el mensaje para el usuario:
        // cy.contains('Invalid email or password').should('be.visible');
        cy.wait('@loginRequest').then((interception) => {
            expect(interception.response.statusCode).to.eq(404);
            // expect(interception.response.body).to.include('no encontrado')
            expect(interception.response.body.error.email).to.include('no encontrado');
        });

        // cy.url().should('include', '/workspace');
    });

    // // alternativa usando request:
    // it('should return 401 if unregistered email tries to login', () => {
    //     cy.request({
    //         method: 'POST',
    // //        url: backendEndpoint,
    //         body: {
    //             email: unregisteredEmail,
    //             password: "password"
    //         },
    //         failOnStatusCode: false
    //     }).then(
    //         (response) => {
    //             expect(response.status).to.eq(401);
    //         })
    // })
})