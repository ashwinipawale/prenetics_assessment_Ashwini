import {Request, Response} from "express";
import {Controller} from "../controller/Controller";

class Routes {
    private controller: Controller;
    constructor() {
        this.controller = new Controller();
    }
    public routes(app: any): void {
        app.route('/')
            .get((request: Request, response: Response) => {
                response.status(200)
                    .send({
                        message: "GET request successfully."
                    });
            });

        //test route
        app.route('/customers')
            .get(this.controller.getAllCustomers)

        //test route to register new customer
        app.route('/register')
        .post(this.controller.registerCustomer)

        app.route('/login')
        .post(this.controller.loginCustomer)

        app.route('/geneticResult')
        .post(this.controller.getGeneticResult.bind(this.controller))

        app.route('/customerInfo')
        .post(this.controller.getCustomerInfo.bind(this.controller))
    }

    
}
export {Routes};