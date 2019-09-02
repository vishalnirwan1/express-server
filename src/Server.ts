import * as bodyParser from 'body-parser';
import * as express from 'express';
import { Database } from './libs';
import { errorHandler } from './libs/routes/errorHandler';
import { notFoundRoutes } from './libs/routes/notFoundRoute';
import router from './router';

const app = express();

export default class Server {
    constructor(private config) {
        this.run();
    }
    public bootstrap() {
        this.initBodyParser();
        this.setupRoutes();
        return this;
    }
    public setupRoutes() {
        app.get('/health-check', (req, res) => {
            res.send('I am Ok');
        });
        app.use('/api', router);
        app.use(errorHandler);
        app.use(notFoundRoutes);
        return this;
    }
    public run() {
        const { config: { port, mongoUri } } = this;
        Database.open(mongoUri);
        app.listen(port);
    }
    private initBodyParser() {
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));
    }
}
