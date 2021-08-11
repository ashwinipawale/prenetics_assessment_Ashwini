"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../connection/db");
const Customer_1 = require("../model/Customer");
const GeneticResult_1 = require("../model/GeneticResult");
const typeorm_1 = require("typeorm");
const jwt = __importStar(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const bcrypt_1 = __importDefault(require("bcrypt"));
class Controller {
    constructor() {
    }
    //test route
    getAllCustomers(req, res) {
        db_1.connection
            .then((connection) => __awaiter(this, void 0, void 0, function* () {
            const customers = yield connection.manager.find(Customer_1.Customer);
            res.json(customers);
        }))
            .catch(error => {
            console.error("Error ", error);
            res.json(error);
        });
    }
    //test route to create new customer
    registerCustomer(req, res) {
        db_1.connection
            .then((connection) => __awaiter(this, void 0, void 0, function* () {
            const custRepo = connection.getRepository(Customer_1.Customer);
            const salt = yield bcrypt_1.default.genSalt(10);
            req.body.password = yield bcrypt_1.default.hash(req.body.password, salt);
            const customer = custRepo.create({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email_id: req.body.email_id,
                dob: req.body.dob,
                password: req.body.password,
                policy_code: req.body.policy_code
            });
            const newCust = yield custRepo.save(customer);
            res.json(newCust);
        }))
            .catch(error => {
            console.error("Error ", error);
            res.json(error);
        });
    }
    loginCustomer(req, res) {
        console.log("Login customer");
        db_1.connection
            .then(() => __awaiter(this, void 0, void 0, function* () {
            const customerRepository = typeorm_1.getRepository(Customer_1.Customer);
            const customer = yield customerRepository.findOne({
                email_id: req.body.email_id
            });
            if (customer) {
                const passwordMatch = yield bcrypt_1.default.compare(req.body.password, customer.password);
                if (passwordMatch) {
                    if (process.env.JWT_SECRET && process.env.JWT_SECRET != "") {
                        const secret = process.env.JWT_SECRET;
                        const exp = Number(process.env.TOKEN_EXPIRY);
                        const expiresIn = exp;
                        const dataStoredInToken = {
                            customer_id: customer.customer_id,
                        };
                        const tokenData = jwt.sign(dataStoredInToken, secret, { expiresIn });
                        res.status(200).json(tokenData);
                    }
                    else {
                        res.status(500).json({ msg: "Internal server error" });
                    }
                }
                else {
                    res.status(401).json({ msg: "Invalid credentials" });
                }
            }
            else {
                throw 'Invalid customer';
            }
        }))
            .catch(error => {
            console.error("Error ", error);
            res.status(401).json(error);
        });
    }
    getCustomerInfo(req, res) {
        console.log("get customer info");
        const customer_id = this.authenticateUser(req, res);
        if (customer_id) {
            console.log("Authentication successful", customer_id);
            db_1.connection
                .then((connection) => __awaiter(this, void 0, void 0, function* () {
                const customerRepository = typeorm_1.getRepository(Customer_1.Customer);
                const customer = yield customerRepository.findOne({
                    customer_id: customer_id
                });
                console.log("gen result found");
                res.status(200).json(customer);
            }))
                .catch(error => {
                console.error("Error ", error);
                res.status(500).json(error);
            });
        }
        else {
            res.status(401).json("User not authorized");
        }
    }
    getGeneticResult(req, res) {
        console.log("get getGeneticResult");
        const customer = this.authenticateUser(req, res);
        if (customer) {
            console.log("Authentication successful");
            db_1.connection
                .then((connection) => __awaiter(this, void 0, void 0, function* () {
                const genResults = yield connection
                    .getRepository(GeneticResult_1.GeneticResult)
                    .createQueryBuilder("genetic_result")
                    .where("genetic_result.customer_id = :customer_id", { customer_id: customer }).getMany();
                console.log("gen res", JSON.stringify(genResults));
                res.status(200).json(genResults);
            }))
                .catch(error => {
                console.error("Error ", error);
                res.status(500).json(error);
            });
        }
        else {
            res.status(401).json("User not authorized");
        }
    }
    authenticateUser(request, response) {
        console.log(`${request.method} ${request.path}`);
        // Get token from header
        const token = request.get('x-auth-token');
        //Check if no token
        if (!token) {
            response.status(401).json({ msg: 'No token, authorization denied' });
            return 0;
        }
        // Verify token
        try {
            if (process.env.JWT_SECRET && process.env.JWT_SECRET != "") {
                const secret = process.env.JWT_SECRET;
                const decodedToken = jwt.verify(token, secret);
                return decodedToken.customer_id;
            }
            else {
                throw 'Internal Server error';
            }
        }
        catch (err) {
            console.log("Verification failed");
            response.status(401).json({ error: err });
            return 0;
        }
    }
}
exports.Controller = Controller;
