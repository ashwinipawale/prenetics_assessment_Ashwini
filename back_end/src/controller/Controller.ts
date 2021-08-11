import {Request, Response} from 'express';
import {connection} from "../connection/db";
import {Customer} from "../model/Customer";
import {GeneticResult} from "../model/GeneticResult";
import { getRepository } from "typeorm";
import * as jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config();
import bcrypt from 'bcrypt'

interface DataStoredInToken {
    customer_id: number;
}

class Controller {
    constructor() {        
    }

    //test route
    public getAllCustomers(req: Request, res: Response) {
        connection
            .then(async connection => {
                const customers: Customer[] = await connection.manager.find(Customer);
                res.json(customers);
            })
            .catch(error => {
                console.error("Error ", error);
                res.json(error);
            });
    }

    //test route to create new customer
    public registerCustomer(req: Request, res: Response) {        
        connection
            .then(async connection => {
                const custRepo = connection.getRepository(Customer);
                const salt = await bcrypt.genSalt(10)
                req.body.password = await bcrypt.hash(req.body.password, salt)
                const customer = custRepo.create({
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    email_id: req.body.email_id,
                    dob:req.body.dob,
                    password: req.body.password,
                    policy_code: req.body.policy_code
                })
                const newCust = await custRepo.save(customer);
                res.json(newCust);
            })
            .catch(error => {
                console.error("Error ", error);
                res.json(error);
            });
    }

    public loginCustomer(req: Request, res: Response) {
        console.log("Login customer")
        connection
            .then(async () => {
                const customerRepository = getRepository(Customer);
                const customer = await customerRepository.findOne({
                    email_id: req.body.email_id
                });
                if(customer){
                    const passwordMatch = await bcrypt.compare(req.body.password, customer.password)
                    if(passwordMatch ){
                        if(process.env.JWT_SECRET && process.env.JWT_SECRET != ""){
                            const secret = process.env.JWT_SECRET
                            const exp = Number(process.env.TOKEN_EXPIRY)
                            const expiresIn = exp
                            const dataStoredInToken: DataStoredInToken = {
                                customer_id: customer.customer_id,
                            };
                            const tokenData = jwt.sign(dataStoredInToken, secret, { expiresIn })
                            res.status(200).json(tokenData);
                        }else{
                            res.status(500).json({msg: "Internal server error"})
                        }
                    }else{
                        res.status(401).json({msg: "Invalid credentials"})
                    }
                }else{
                    throw 'Invalid customer'
                }
            })
            .catch(error => {
                console.error("Error ", error);
                res.status(401).json(error);
            });
    }

    public getCustomerInfo(req: Request, res: Response) {
        console.log("get customer info")
        const customer_id = this.authenticateUser(req, res);
        if(customer_id){
            console.log("Authentication successful", customer_id)
            connection
                .then(async connection => {
                    const customerRepository = getRepository(Customer);
                    const customer = await customerRepository.findOne({
                    customer_id: customer_id
                });                       
                    console.log("gen result found")
                    res.status(200).json(customer);
                })
                .catch(error => {
                    console.error("Error ", error);
                    res.status(500).json(error);
                });
            }else{
                res.status(401).json("User not authorized");
            }
    }

    public getGeneticResult(req: Request, res: Response) {
        console.log("get getGeneticResult")
        const customer = this.authenticateUser(req, res);
        if(customer){
            console.log("Authentication successful")
            connection
                .then(async connection => {
                    const genResults: GeneticResult[] = await connection
                        .getRepository(GeneticResult)
                        .createQueryBuilder("genetic_result")
                        .where("genetic_result.customer_id = :customer_id", { customer_id: customer }).getMany() ;                         

                    console.log("gen res", JSON.stringify(genResults))
                    res.status(200).json(genResults);
                })
                .catch(error => {
                    console.error("Error ", error);
                    res.status(500).json(error);
                });
        }else{
            res.status(401).json("User not authorized");
        }
    }
    
    public authenticateUser(request: Request, response: Response) : number {
        console.log(`${request.method} ${request.path}`);
        // Get token from header
        const token = request.get('x-auth-token')
        //Check if no token
        if(!token){
            response.status(401).json({ msg : 'No token, authorization denied' });
            return 0;
        }

        // Verify token
        try{
            if(process.env.JWT_SECRET && process.env.JWT_SECRET != ""){
                const secret = process.env.JWT_SECRET
                const decodedToken = jwt.verify(token, secret);
                return (<any>decodedToken).customer_id;
            }else{
                throw 'Internal Server error'
            }
        }catch(err){
            console.log("Verification failed");
            response.status(401).json({ error : err});
            return 0
        }
    }
}
export {Controller}