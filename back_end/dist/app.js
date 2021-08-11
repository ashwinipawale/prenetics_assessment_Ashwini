"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Routes_1 = require("./routes/Routes");
const cors_1 = __importDefault(require("cors"));
class App {
    constructor() {
        // initializing express in this application
        this.app = express_1.default();
        // support application/json type post data
        this.app.use(express_1.default.json());
        this.app.use(cors_1.default({
            origin: 'https://localhost:8080'
        }));
        //support application/x-www-form-urlencoded post data
        this.app.use(express_1.default.urlencoded({ extended: false }));
        // for routing the http request to controller
        this.routePrv = new Routes_1.Routes();
        this.routePrv.routes(this.app);
    }
}
exports.default = new App().app;
