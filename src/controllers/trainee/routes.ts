import { Router } from 'express';
import { authMiddleWare, validationHandler } from '../../libs';
import traineeController from './Controller';
import validation from './validation';
const traineeRouter = new Router();

traineeRouter.route('/')
    .get(validationHandler(validation.get), authMiddleWare('getUsers', 'read'), traineeController.get)
    .post(validationHandler(validation.create), traineeController.create)
    .put(validationHandler(validation.update), traineeController.update)
    .delete(validationHandler(validation.delete), traineeController.delete);
export default traineeRouter;
