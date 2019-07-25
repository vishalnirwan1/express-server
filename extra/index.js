/* eslint-disable no-console */
import { equilateralTriangle, diamondTriangle } from './patterns';
import { hasPermission, validateUsers } from './utils';
import { users } from './constants';

const n = process.argv[2];
const m = process.argv[3];
equilateralTriangle(n);
diamondTriangle(m);

console.log(hasPermission('getUsers', 'head-trainer', 'delete'));
validateUsers(users);
