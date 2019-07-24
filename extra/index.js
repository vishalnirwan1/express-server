/* eslint-disable no-console */
import { equilateralTriangle, diamondTriangle } from './patterns';
import { hasPermission, validateUsers } from './utils';
import { users } from './constants';

console.log(users);
const n = process.argv[2];
equilateralTriangle(n);
diamondTriangle(n);

console.log(hasPermission('getUsers', 'head-trainer', 'delete'));
validateUsers(users);
