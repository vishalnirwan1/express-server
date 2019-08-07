import { config } from 'dotenv';
import { IConfig } from './IConfig';

config();
const enVars = process.env;
const configuration: IConfig = Object.freeze({
    port: enVars.PORT,
    secretKey: enVars.SECRET_KEY,
    mongoUri: enVars.MONGO_URL,
});
console.log('config is ::::: ', configuration);
export default configuration;
