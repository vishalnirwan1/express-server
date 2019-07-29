import * as express from 'express';
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
        return this;
    }
    public setupRoutes() {
        app.get('/health-check', (req, res) => {
            res.send('I am Ok');
        });
        return this;
    }
    public run() {
        const { config: { port } } = this;
        app.listen(port);
  }
}
