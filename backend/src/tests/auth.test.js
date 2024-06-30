const supertest = require('supertest');
const { bootstrapApp } = require("../bootstrap");
const app = bootstrapApp();
const fakeRequest = supertest(app);
const { disconnectDB, connectDB } = require("../mongo/connection");

beforeAll(async () => {
    await connectDB();
    console.log("Connected to test database");
});

afterAll(async () => {
    await disconnectDB();
    console.log("Disconnected from test database");
});

describe('Auth controller TEST', () => {
    const userData = {
        email: 'hadassa@gmail.com',
        name: 'Hadassa',
        password: 'password'
    }

    describe('POST /register', () => {
        it('should allow user to register', async () => {
            const res = await fakeRequest.post('/signup').send(userData);
            // console.log(res.body);
            expect(res.status).toBe(201);
            expect(res.body.token).toBeDefined();
            expect(res.body.user.id).toBeDefined();
            expect(res.body.user.email).toBeDefined();
            expect(res.body.user.name).toBeDefined();
            const createdAt = new Date(res.body.user.createdAt);
            expect(createdAt.getTime()).toBeLessThanOrEqual(Date.now());
            // console.log('gtetime', createdAt.getTime(), 'date now:', Date.now());
            expect(res.body.user.password).not.toBe(userData.password);
            console.log(res.body.user.password);
        })
    })

    describe('POST /login', () => {
        it('should allow user to login', async () => {
            const res = await fakeRequest.post('/login').send(userData);
            console.log(res.body, 'the BODYYYY')
            expect(res.status).toBe(200);
            expect(res.body.token).toBeDefined();
            expect(res.body.user.email).toBe(userData.email);
            expect(res.body.user.name).toBe(userData.name);
            // expect(res.body.user.role)
        });
        it('shouldn\'t allow unregistered emails to login', async () => {
            const res = await fakeRequest.post('/login').send({
                "email": "wrong@email.com",
                "password": "password"
            });
            expect(res.status).toBe(401);
        });
        it("shouldn\'t let the user login if passwords don't match", async () => {
            const res = await fakeRequest.post("/login").send({ ...userData, password: "wrong password" });
            expect(res.status).toBe(401);
        });
    })
})