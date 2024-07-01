import { emptyWorkspaceMessage } from "../../src/utils/utils.js";

describe('Login flow', () => {
    const signupEndpoint = 'http://localhost:3000/signup';

    beforeEach(() => {
        cy.visit(signupEndpoint);
        cy.get('[name="email"]').as("emailInput");
        cy.get('[name="name"]').as("nameInput");
        cy.get('[name="password"]').as("passwordInput")
    })
    const newEmail = 'new@gmail.com';
    const existingEmail = 'maria@email.com';
    const userName = 'username'
    const password = 'password';

    it('form with email, name and password inputs appears', () => {
        cy.get("@emailInput").should('exist');
        cy.get("@nameInput").should('exist');
        cy.get("@passwordInput").should('exist');
    });

    it('new user is able to register and is redirected to their own (empty) workspace', () => {
        cy.intercept('POST', '/signup').as('signupRequest');
        cy.get("@emailInput").type(newEmail);
        cy.get("@nameInput").type(userName);
        cy.get("@passwordInput").type(password);
        cy.get('button').contains('SIGN UP').click();
        cy.url().should('include', '/workspace');
        cy.wait('@signupRequest').then((interception) => {
            expect(interception.response.statusCode).to.eq(201);
        });
        cy.contains(emptyWorkspaceMessage)
    })

    it('already registered email is not able to register', () => {
        cy.intercept('POST', '/signup').as('signupRequest');
        cy.get("@emailInput").type(existingEmail);
        cy.get("@nameInput").type(userName);
        cy.get("@passwordInput").type(password);
        cy.get('button').contains('SIGN UP').click();
        cy.wait('@signupRequest').then((interception) => {
            expect(interception.response.statusCode).to.eq(409);
        });
    });
})