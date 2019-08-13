import { Router } from 'express';
import { authMiddleWare, validationHandler } from '../../libs';
import userController from './Controller';
const userRouter = new Router();

userRouter.route('/login')
    .post(userController.login);
userRouter.route('/profile')
    .get(authMiddleWare('getUsers', 'write'), userController.fetchUser);
userRouter.route('/update')
    .put(userController.updateUser);
userRouter.route('/delete/:id')
    .delete(userController.deleteUser);

export default userRouter;
