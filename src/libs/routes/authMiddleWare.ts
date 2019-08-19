import * as jwt from 'jsonwebtoken';
import { hasPermission } from '../../../extraTs/utils';
import { configuration } from '../../config';
import UserRepository from '../../repositories/user/UserRepository';
const userRepository = new UserRepository();

export default (moduleName, permissionType) => async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const userInfo = jwt.verify(token, configuration.secretKey);
        const role = userInfo.role;
        const user = await userRepository.get({ originalId: userInfo.originalId, deletedAt: { $exists: false } });
        if (!user) {
            next(' User does not exist');
        }
        req.user = user;
        if (hasPermission(moduleName, role, permissionType)) {
            next();

        } else {
            next({
                error: 'Unauthorised Access',
                status: 401,
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
