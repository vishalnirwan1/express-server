import { config } from 'dotenv';
import { IConfig } from './IConfig';

config();
const enVars = process.env;
const configuration: IConfig = Object.freeze({
    port: enVars.PORT,
});
console.log('config is ::::: ', configuration);
export default configuration;
