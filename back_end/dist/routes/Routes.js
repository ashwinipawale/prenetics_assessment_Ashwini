"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Controller_1 = require("../controller/Controller");
class Routes {
    constructor() {
        this.controller = new Controller_1.Controller();
    }
    routes(app) {
        app.route('/')
            .get((request, response) => {
            response.status(200)
                .send({
                message: "GET request successfully."
            });
        });
        //test route
        app.route('/customers')
            .get(this.controller.getAllCustomers);
        //test route to register new customer
        app.route('/register')
            .post(this.controller.registerCustomer);
        app.route('/login')
            .post(this.controller.loginCustomer);
        app.route('/geneticResult')
            .post(this.controller.getGeneticResult.bind(this.controller));
        app.route('/customerInfo')
            .post(this.controller.getCustomerInfo.bind(this.controller));
    }
}
exports.Routes = Routes;
