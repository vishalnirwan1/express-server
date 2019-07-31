import * as bodyParser from 'body-parser';
import * as express from 'express';
import { middle2 } from './libs/routes/errorHandler';
import { middle1 } from './libs/routes/notFoundRoute';
import router from './router';

const app = express();

export default class Server {
    constructor(private config) {
        this.setupRoutes();
        this.run();
     }
    public bootstrap() {
        this.setupRoutes();
        this.initBodyParser();
        return this;
    }
    public setupRoutes() {
        app.get('/health-check', (req, res) => {
            res.send( 'I am Ok' );
       });
        app.use('/api', router);
        app.use(middle1);
        app.use(middle2);
        return this;
    }
       public run() {
        const { config: { port } } = this;
        app.listen(port);
  }
    private initBodyParser() {
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));
    }
}
