const supertest = require('supertest');
const { bootstrapApp } = require("../bootstrap");
const app = bootstrapApp();
const fakeRequest = supertest(app);
const { disconnectDB, connectDB } = require("../mongo/connection");

// sustituir por endpoints de nuestra app
describe('Auth controller TEST', () => {
    const userData = {
        email: 'hadassa@gmail.com',
        name: 'Hadassa',
        password: 'password'
    }

    describe('POST /register', () => {
        it('should allow user to register', async () => {

        })

    })

    describe('POST /login', () => {
        it('should allow user to login', async () => {

        })

    })
})