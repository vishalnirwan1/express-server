import * as bodyParser from 'body-parser';
import * as express from 'express';
import { middle2 } from './libs/routes/errorHandler';
import { middle1 } from './libs/routes/notFoundRoute';

const app = express();
// let router = express.Router();

export default class Server {
    // private config;
    constructor(private config) {
        // this.config = config;
        // console.log(this.config)
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
        app.use(middle1);
        app.use('/api', middle2);
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
