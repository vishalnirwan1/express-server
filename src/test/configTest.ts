import { MongoMemoryServer } from 'mongodb-memory-server';
import { configuration } from '../config';
import Database from '../libs/Database';
import Server from '../Server';

const mockMongo = new MongoMemoryServer();
let app1;
export default async () => {

    const mongoUrl = await mockMongo.getConnectionString();

    const server = new Server(configuration);
    app1 = await server.bootstrap();
    await Database.open(mongoUrl);
    return {mongoUrl, app1};
};
