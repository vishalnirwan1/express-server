import { Router } from 'express';
import { authMiddleWare, validationHandler } from '../../libs';
import traineeController from './Controller';
import validation from './validation';
const traineeRouter = new Router();

traineeRouter.route('/')
    .get(validationHandler(validation.get), authMiddleWare('getUsers', 'read'), traineeController.get)
    .post(validationHandler(validation.create), authMiddleWare('getUsers', 'read'), traineeController.create)
    .put(validationHandler(validation.update), authMiddleWare('getUsers', 'read'), traineeController.update);
traineeRouter.route('/:id')
    .delete(validationHandler(validation.delete), authMiddleWare('getUsers', 'read'), traineeController.delete);
export default traineeRouter;
