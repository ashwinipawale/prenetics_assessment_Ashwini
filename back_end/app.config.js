import * as dotenv from 'dotenv'
dotenv.config();

const DB_HOST = process.env.DB_HOST;
const DB_TYPE = process.env.DB_TYPE;
const DB_PORT = process.env.DB_PORT;
const DB_USER = "lipios-admin";
const DB_PASSWORD = "BTF43nc8O*BY(RlprfY";
const DB_NAME = "Lipios";


export const config = {
    DB_HOST, 	
    DB_TYPE, 	
    DB_PORT,	
    DB_USER,    
    DB_PASSWORD,
    DB_NAME
};
