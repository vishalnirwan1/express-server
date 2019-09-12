import * as request from 'supertest';
import configTest from './configTest';
import { createData } from './mock/createData';
import { loginData } from './mock/loginData';
import { updateData } from './mock/updatData';

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

    it('should update a trainee', async (done) => {
        const dataToUpdate = updateData.Success;

        const res = await request(app1.app)
            .put('/api/trainee')
            .set('Authorization', token)
            .set('Accept', 'application/json')
            .send({
                id: traineeId,
                dataToUpdate,
            });

        const { body: { status } } = res;
        expect(status).toEqual(200);
        expect(res.body).toHaveProperty('data');
        done();
    });

    it('should not update a trainee', async (done) => {
        const dataToUpdate = updateData.Success;

        const res = await request(app1.app)
            .put('/api/trainee')
            .set('Authorization', token)
            .set('Accept', 'application/json')
            .send({
                dataToUpdate,
            });
        const { error: { status, message } } = res.body;
        expect(status).toEqual(400);
        expect(message).toEqual(['id is required']);
        done();
    });

    it('should not update a trainee', async (done) => {

        const res = await request(app1.app)
            .put('/api/trainee')
            .set('Authorization', token)
            .set('Accept', 'application/json')
            .send(updateData.Empty);
        const { error: { status, message } } = res.body;
        expect(status).toEqual(400);
        expect(message).toEqual(['dataToUpdate is required', 'update data must be in object type', 'id is required']);
        done();
    });

    it('should not update a trainee only id', async (done) => {

        const res = await request(app1.app)
            .put('/api/trainee')
            .set('Authorization', token)
            .set('Accept', 'application/json')
            .send({
                id: traineeId,
            });
        const { error: { status, message } } = res.body;
        expect(status).toEqual(400);
        expect(message).toEqual(['dataToUpdate is required', 'update data must be in object type']);
        done();
    });

    it('should not update a trainee', async (done) => {
        const dataToUpdate = updateData.alreadyExistingEmail;

        const res = await request(app1.app)
            .put('/api/trainee')
            .set('Authorization', token)
            .set('Accept', 'application/json')
            .send({
                id: traineeId,
                dataToUpdate,
            });
        const { error: { status, message } } = res.body;
        expect(status).toEqual(400);
        expect(message).toEqual('Trainee already exists with this email id');
        done();
    });

    it('should not update a trainee', async (done) => {
        const dataToUpdate = updateData.EmptyPassword;

        const res = await request(app1.app)
            .put('/api/trainee')
            .set('Authorization', token)
            .set('Accept', 'application/json')
            .send({
                id: traineeId,
                dataToUpdate,
            });
        const { error: { status, message } } = res.body;
        expect(status).toEqual(400);
        expect(message).toEqual('password is required');
        done();
    });

    it('should not update a trainee', async (done) => {
        const dataToUpdate = updateData.EmptyName;

        const res = await request(app1.app)
            .put('/api/trainee')
            .set('Authorization', token)
            .set('Accept', 'application/json')
            .send({
                id: traineeId,
                dataToUpdate,
            });
        const { error: { status, message } } = res.body;
        expect(status).toEqual(400);
        expect(message).toEqual('name is required or must be string');
        done();
    });

    it('should not update a trainee', async (done) => {
        const dataToUpdate = updateData.EmptyEmail;

        const res = await request(app1.app)
            .put('/api/trainee')
            .set('Authorization', token)
            .set('Accept', 'application/json')
            .send({
                id: traineeId,
                dataToUpdate,
            });
        const { error: { status, message } } = res.body;
        expect(status).toEqual(404);
        expect(message).toEqual('User validation failed: email: Path `email` is required.');
        done();
    });

});
