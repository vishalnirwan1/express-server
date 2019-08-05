import * as jwt from 'jsonwebtoken';
import { hasPermission } from '../../../extraTs/utils';
import { configuration } from '../../config';

export default (moduleName, permissionType) => (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const userinfo = jwt.verify(token, configuration.secretKey);
        const role = userinfo.role;
        if (hasPermission(moduleName, role, permissionType)) {
            next();
        } else {
            next({
                error: 'Unauthorised Access',
                status: 403,
            });
        }
    }
    catch (err) {
        console.log('error is --', err);
        next({
            error: 'Access forbidden',
            status: 403,
        });
    }
};
