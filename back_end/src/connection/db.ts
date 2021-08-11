import {createConnection} from "typeorm";
import {Customer} from "../model/Customer";
import { GeneticResult } from "../model/GeneticResult";
import dotenv from 'dotenv'
const result = dotenv.config()

if (result.error) {
    throw result.error
}

const connection = createConnection({
    type: "postgres", 
    host: process.env.DB_HOST,
    port: 5432,
    username: process.env.DB_USER, 
    password: process.env.DB_PASSWORD, 
    database: process.env.DB_NAME, 
    entities: [
        Customer, 
        GeneticResult
    ],
    synchronize: true,
    logging: false
});

export {connection};