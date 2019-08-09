import { Router } from 'express';
import { authMiddleWare, validationHandler } from '../../libs';
import userController from './Controller';
const userRouter = new Router();

userRouter.route('/login')
    .post(userController.login);
userRouter.route('/profile')
    .get(authMiddleWare('user', 'read'), userController.fetchUser);

export default userRouter;
