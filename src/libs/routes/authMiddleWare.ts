import * as jwt from 'jsonwebtoken';
import { hasPermission } from '../../../extraTs/utils';
import { configuration } from '../../config';
import UserRepository from '../../repositories/user/UserRepository';
const userRepository = new UserRepository();

export default (moduleName, permissionType) => async (req, res, next) => {
    try {
        const { authorization: token } = req.headers;
        const userInfo = jwt.verify(token, configuration.secretKey);
        const { role, originalId } = userInfo;
        const user = await userRepository.get({ originalId, deletedAt: { $exists: false } });
        if (!user) {
            next(' User does not exist');
        }
        req.user = user;
        if (hasPermission(moduleName, role, permissionType)) {
            req.body.userId = userInfo.originalId;
            next();

        } else {
            next({
                message: 'Access forbidden',
                status: 403,
            });
        }
    }
    catch (err) {
        console.log('error is --', err);
        next({
            message: 'Unauthorised Access',
            status: 401,
        });
    }
};
