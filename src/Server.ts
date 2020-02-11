import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as swaggerUi from 'swagger-ui-express';
import { Database } from './libs';
import { errorHandler } from './libs/routes/errorHandler';
import { notFoundRoutes } from './libs/routes/notFoundRoute';
import router from './router';
import * as swaggerDoc from './swagger.json';

// export const app = express();

export default class Server {
    private app: express.Express;
    constructor(private config) {
        this.app = express();
    }

    public application() {
        return this.app;
    }

    public bootstrap() {
        this.initBodyParser();
        this.setupRoutes();
        return this;
    }

    public setupRoutes() {
        this.app.get('/health-check', (req, res) => {
            res.send('I am Ok');
        });
        this.app.use('/api', router);
        this.app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
        this.app.use(errorHandler);
        this.app.use(notFoundRoutes);
        return this;
    }
    public run() {
        const { config: { port, mongoUri } } = this;
        Database.open(mongoUri);
        this.app.listen(port);
    }
    private initBodyParser() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
    }
}
