import { emptyWorkspaceMessage } from "../../src/utils/utils.js";

describe('Signup flow', () => {
    const signupEndpoint = 'http://localhost:3000/signup';

    beforeEach(() => {
        cy.visit(signupEndpoint);
        cy.get('[name="email"]').as("emailInput");
        cy.get('[name="name"]').as("nameInput");
        cy.get('[name="password"]').as("passwordInput")
    })
    const newEmail = 'new@gmail.com';
    const existingEmail = 'existing@email.com';
    const userName = 'username'
    const password = 'password';

    it('form with email, name and password inputs appears', () => {
        cy.get("@emailInput").should('exist');
        cy.get("@nameInput").should('exist');
        cy.get("@passwordInput").should('exist');
    });

    it('new user can register, is redirected to their own (empty) workspace and can delete their account', () => {
        cy.get("@emailInput").type(newEmail);
        cy.get("@nameInput").type(userName);
        cy.get("@passwordInput").type(password);
        cy.get('button').contains('SIGN UP').click();
        cy.url().should('include', '/workspace');
        cy.contains(emptyWorkspaceMessage);
        cy.get('[id="profileIcon"]').click();
        cy.get('[id="accountSettings"]').click();
        cy.get('[id="deleteAccountButton"]').click();
        cy.get('[id="confirmDeleteAccountButton"]').click();
        cy.url().should('include', '/home');
    });

    it('already registered email is not able to register', () => {
        cy.intercept('POST', '/signup').as('signupRequest');
        cy.get("@emailInput").type(existingEmail);
        cy.get("@nameInput").type(userName);
        cy.get("@passwordInput").type(password);
        cy.get('button').contains('SIGN UP').click();
        cy.wait('@signupRequest').then((interception) => {
            expect(interception.response.statusCode).to.eq(409);
        });
        // cy.contains('email already registered')
        // a añadir mensaje "email already registered"
    });
})