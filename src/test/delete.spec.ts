import * as request from 'supertest';
import configTest from './configTest';
import { createData } from './mock/createData';
import { loginData } from './mock/loginData';

let app1;
let token;
let traineeId;
describe('Update Trainee', () => {
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

    beforeAll(async (done) => {

        const res = await request(app1.app)
            .post('/api/trainee')
            .set('Authorization', token)
            .set('Accept', 'application/json')
            .send(createData.Success);
        const { data: { details: { originalId } } } = res.body;
        traineeId = originalId;
        done();
    });

    it('should delete a trainee', async (done) => {

        const res = await request(app1.app)
            .delete(`/api/trainee/${traineeId}`)
            .set('Authorization', token)
            .set('Accept', 'application/json');

        const { body: { status } } = res;
        expect(status).toEqual(200);
        expect(res.body).toHaveProperty('data');
        done();
    });

    it('should not delete a trainee', async (done) => {

        const res = await request(app1.app)
            .delete(`/api/trainee/${23232323}`)
            .set('Authorization', token)
            .set('Accept', 'application/json');

        const { error: { status, message } } = res.body;
        expect(status).toEqual(404);
        expect(message).toEqual('user not found for delete');
        done();
    });
    it('should not delete a trainee', async (done) => {

        const res = await request(app1.app)
            .delete(`/api/trainee/${traineeId}`)
            .set('Authorization', 'token')
            .set('Accept', 'application/json');

        const { error: { status, message } } = res.body;
        expect(status).toEqual(401);
        expect(message).toEqual('Unauthorised Access');
        done();
    });
});
