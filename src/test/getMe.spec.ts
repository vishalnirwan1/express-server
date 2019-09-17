import * as request from 'supertest';
import configTest from './configTest';
import { loginData } from './mock/loginData';

let app1;
let token;

describe('get Trainee', () => {
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
    it('should fetch all trainees', async (done) => {

        const res = await request(app1.app)
            .get('/api/user/profile')
            .set('Authorization', token)
            .set('Accept', 'application/json');

        const { body: { status } } = res;
        expect(status).toEqual(200);
        expect(res.body).toHaveProperty('data');
        done();
    });

    it('should not fetch details of the user', async (done) => {

        const res = await request(app1.app)
            .get('/api/user/profile')
            .set('Authorization', 'token')
            .set('Accept', 'application/json');

        const { error: { status, message } } = res.body;
        expect(status).toEqual(401);
        expect(message).toEqual('Unauthorised Access');
        done();
    });

});
