import { Router } from 'express';
// import { authMiddleWare, validationHandler } from '../../libs';
import userController from './Controller';
// import validation from './validation';
const userRouter = new Router();

userRouter.route('/')
    .get(/*validationHandler(validation.get), authMiddleWare('getUsers', 'read'),*/userController.get)
    .post(/*validationHandler(validation.create), */userController.create)
    .put(/*validationHandler(validation.update), */userController.update);
userRouter.route('/:id')
    .delete(/*validationHandler(validation.delete), */userController.delete);
export default userRouter;
