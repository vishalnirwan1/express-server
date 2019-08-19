import { Router } from 'express';
import { authMiddleWare, validationHandler } from '../../libs';
import userController from './Controller';
import validation from './validation';
const userRouter = new Router();

userRouter.route('/login')
    .post(validationHandler(validation.create), userController.login);
userRouter.route('/profile')
    .get(validationHandler(validation.get), authMiddleWare('getUsers', 'write'), userController.fetchUser);
userRouter.route('/update')
    .put(validationHandler(validation.update), userController.updateUser);
userRouter.route('/delete/:id')
    .delete(validationHandler(validation.delete), userController.deleteUser);

export default userRouter;
