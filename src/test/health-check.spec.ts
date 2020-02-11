import * as request from 'supertest';
import { configuration } from '../config';
import Server from '../Server';

let app1;
describe('first server check', () => {
    beforeAll(async (done) => {
        const server = new Server(configuration);
        app1 = await server.bootstrap();
        done();
    });

    describe('checking server', () => {
        it('should check the server', async (done) => {
            const res = await request(app1.app)
                .get('/health-check');

            expect(res.status).toEqual(200);
            expect(res.text).toMatch('I am Ok');
            done();
        });
    });
});
