import express from 'express'
import {Routes} from "./routes/Routes";
import cors from 'cors';

class App {
    public app: express.Application;
        public routePrv: Routes;

        constructor() {
        // initializing express in this application
            this.app = express();
        // support application/json type post data
            this.app.use(express.json());
            this.app.use(cors({
                origin: 'https://localhost:8080'
            }));
        //support application/x-www-form-urlencoded post data
            this.app.use(express.urlencoded({ extended: false }));
        // for routing the http request to controller
            this.routePrv = new Routes();
            this.routePrv.routes(this.app);
        }
}
export default new App().app;