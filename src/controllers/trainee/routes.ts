import { Router } from 'express';
import { authMiddleWare, validationHandler } from '../../libs';
import traineeController from './Controller';
import validation from './validation';
const traineeRouter = new Router();

traineeRouter.route('/')
    .get(validationHandler(validation.get), authMiddleWare('getUsers', 'write'), traineeController.get)
    .post(validationHandler(validation.create), authMiddleWare('getUsers', 'write'), traineeController.create)
    .put(validationHandler(validation.update), authMiddleWare('getUsers', 'write'), traineeController.update);
traineeRouter.route('/:id')
    .delete(validationHandler(validation.delete), authMiddleWare('getUsers', 'write'), traineeController.delete);
export default traineeRouter;
