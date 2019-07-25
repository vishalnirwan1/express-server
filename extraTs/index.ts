/* eslint-disable no-console */
import { users } from './constants';
import { diamondTriangle,  equilateralTriangle } from './patterns';
import { hasPermission, validateUsers } from './utils';

// const n = Number(process.argv[2]);
// const m = Number(process.argv[3]);

equilateralTriangle(6);
diamondTriangle(3);

console.log(hasPermission('getUsers', 'head-trainer', 'delete'));
validateUsers(users);
