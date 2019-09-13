import * as request from 'supertest';
import configTest from './configTest';
import { loginData } from './mock/loginData';

let app1;

describe('Login EndPoint', () => {

    beforeAll(async (done) => {

        const setupServer = await configTest();
        app1 = setupServer.app1;
        done();
    });

    it('should login successfully', async (done) => {

        const res = await request(app1.app)
            .post('/api/user/login')
            .set('Accept', 'application/json')
            .send(loginData.Success);

        const { body: { status } } = res;
        expect(status).toEqual(200);
        expect(res.body).toHaveProperty('data');
        done();
    });

    it('should not login successfully', async (done) => {

        const res = await request(app1.app)
            .post('/api/user/login')
            .set('Accept', 'application/json')
            .send(loginData.Email);

        const { error: { status, message } } = res.body;
        expect(status).toEqual(400);
        expect(message).toEqual(['password is required']);
        done();
    });

    it('should not login successfully', async (done) => {

        const res = await request(app1.app)
            .post('/api/user/login')
            .set('Accept', 'application/json')
            .send(loginData.Password);

        const { error: { status, message } } = res.body;
        expect(status).toEqual(400);
        expect(message).toEqual(['email is required']);
        done();
    });

    it('should not login successfully', async (done) => {

        const res = await request(app1.app)
            .post('/api/user/login')
            .set('Accept', 'application/json')
            .send(loginData.Empty);

        const { error: { status, message } } = res.body;
        expect(status).toEqual(400);
        expect(message).toEqual(['email is required', 'password is required']);
        done();
    });

    it('should not login successfully', async (done) => {

        const res = await request(app1.app)
            .post('/api/user/login')
            .set('Accept', 'application/json')
            .send(loginData.InvalidEmail);

        const { error: { status, message } } = res.body;
        expect(status).toEqual(400);
        expect(message).toEqual(['invalid email']);
        done();
    });
    it('should not login successfully', async (done) => {

        const res = await request(app1.app)
            .post('/api/user/login')
            .set('Accept', 'application/json')
            .send(loginData.DifferentEmail);

        const { error: { status, message } } = res.body;
        expect(status).toEqual(404);
        expect(message).toEqual('User not found');
        done();
    });

    it('should not login successfully', async (done) => {

        const res = await request(app1.app)
            .post('/api/user/login')
            .set('Accept', 'application/json')
            .send(loginData.DifferentPassword);

        const { error: { status, message } } = res.body;
        expect(status).toEqual(400);
        expect(message).toEqual('Password does not match!!!!!');
        done();
    });
});
