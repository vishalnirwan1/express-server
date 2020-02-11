import * as request from 'supertest';
import configTest from './configTest';
import { createData } from './mock/createData';
import { loginData } from './mock/loginData';

let app1;
let token;
describe('Create Trainee', () => {
    beforeAll(async (done) => {

        const setupServer = await configTest();
        app1 = setupServer.app1;
        done();
    });
    beforeAll(async (done) => {
        const res = await request(app1.app)
            .post('/api/user/login')
            .set('Accept', 'application/json')
            .send(loginData.Success);

        token = res.body.data.token;
        done();
    });

    it('should create a trainee', async (done) => {

        const res = await request(app1.app)
            .post('/api/trainee')
            .set('Authorization', token)
            .set('Accept', 'application/json')
            .send(createData.Success);

        const { body: { status } } = res;
        expect(status).toEqual(200);
        expect(res.body).toHaveProperty('data');
        done();
    });

    it('should not create a trainee', async (done) => {

        const res = await request(app1.app)
            .post('/api/trainee')
            .set('Authorization', token)
            .set('Accept', 'application/json')
            .send(createData.Name);

        const { error: { status, message } } = res.body;
        expect(status).toEqual(400);
        expect(message).toEqual(['email is required', 'password is required']);
        done();
    });

    it('should not create a trainee', async (done) => {

        const res = await request(app1.app)
            .post('/api/trainee')
            .set('Authorization', token)
            .set('Accept', 'application/json')
            .send(createData.Email);

        const { error: { status, message } } = res.body;
        expect(status).toEqual(400);
        expect(message).toEqual(['password is required', 'Name is required']);
        done();
    });

    it('should not create a trainee', async (done) => {

        const res = await request(app1.app)
            .post('/api/trainee')
            .set('Authorization', token)
            .set('Accept', 'application/json')
            .send(createData.Password);

        const { error: { status, message } } = res.body;
        expect(status).toEqual(400);
        expect(message).toEqual(['email is required', 'Name is required']);
        done();
    });

    it('should not create a trainee', async (done) => {

        const res = await request(app1.app)
            .post('/api/trainee')
            .set('Authorization', token)
            .set('Accept', 'application/json')
            .send(createData.NameEmail);

        const { error: { status, message } } = res.body;
        expect(status).toEqual(400);
        expect(message).toEqual(['password is required']);
        done();
    });

    it('should not create a trainee', async (done) => {

        const res = await request(app1.app)
            .post('/api/trainee')
            .set('Authorization', token)
            .set('Accept', 'application/json')
            .send(createData.NamePassword);

        const { error: { status, message } } = res.body;
        expect(status).toEqual(400);
        expect(message).toEqual(['email is required']);
        done();
    });

    it('should not create a trainee', async (done) => {

        const res = await request(app1.app)
            .post('/api/trainee')
            .set('Authorization', token)
            .set('Accept', 'application/json')
            .send(createData.EmailPassword);

        const { error: { status, message } } = res.body;
        expect(status).toEqual(400);
        expect(message).toEqual(['Name is required']);
        done();
    });

    it('should not create a trainee', async (done) => {

        const res = await request(app1.app)
            .post('/api/trainee')
            .set('Authorization', token)
            .set('Accept', 'application/json')
            .send(createData.EmailName);

        const { error: { status, message } } = res.body;
        expect(status).toEqual(400);
        expect(message).toEqual(['password is required']);
        done();
    });

    it('should not create a trainee', async (done) => {

        const res = await request(app1.app)
            .post('/api/trainee')
            .set('Authorization', token)
            .set('Accept', 'application/json')
            .send(createData.Empty);

        const { error: { status, message } } = res.body;
        expect(status).toEqual(400);
        expect(message).toEqual(['email is required', 'password is required', 'Name is required']);
        done();
    });

    it('should not create a trainee', async (done) => {

        const res = await request(app1.app)
            .post('/api/trainee')
            .set('Authorization', token)
            .set('Accept', 'application/json')
            .send(createData.InvalidEmail);

        const { error: { status, message } } = res.body;
        expect(status).toEqual(400);
        expect(message).toEqual(['invalid email']);
        done();
    });

    it('should not create a trainee', async (done) => {

        const res = await request(app1.app)
            .post('/api/trainee')
            .set('Authorization', token)
            .set('Accept', 'application/json')
            .send(createData.InvalidName);

        const { error: { status, message } } = res.body;
        expect(status).toEqual(400);
        expect(message).toEqual(['invalid name']);
        done();
    });

    it('should not create a trainee', async (done) => {

        const res = await request(app1.app)
            .post('/api/trainee')
            .set('Authorization', token)
            .set('Accept', 'application/json')
            .send(createData.InvalidEmailName);

        const { error: { status, message } } = res.body;
        expect(status).toEqual(400);
        expect(message).toEqual(['invalid email', 'invalid name']);
        done();
    });

    it('should not create a trainee', async (done) => {

        const res = await request(app1.app)
            .post('/api/trainee')
            .set('Authorization', token)
            .set('Accept', 'application/json')
            .send(createData.SameEmail);

        const { error: { status, message } } = res.body;
        expect(status).toEqual(400);
        expect(message).toEqual('Trainee already exists with this email id');
        done();
    });
});
