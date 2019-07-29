import { config } from 'dotenv';
import { IConfig } from './IConfig';

// console.log(config().parsed.PORT)
// export default config();
config();
const enVars = process.env;
const configuration: IConfig = Object.freeze({
    port: enVars.PORT,
});
console.log('config is ::::: ', configuration);
export default configuration;
