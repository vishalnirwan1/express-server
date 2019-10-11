import { Router } from 'express';
import * as multer from 'multer';
import { authMiddleWare, validationHandler } from '../../libs';
import traineeController from './Controller';
import validation from './validation';

const traineeRouter = new Router();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(undefined, './uploads/');
    },
    filename: (req, file, cb ) => {
        cb(undefined, Date.now() + file.originalname);
    },
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' ) {
        cb(undefined, true);
    }
    else {
        console.log('!!!!!!!!!!!!!!!!');
        cb(new Error('only images'), false);
    }
};
const upload = multer({ storage, limits: { filesize: 10000000000 }, fileFilter });

traineeRouter.route('/')
    .get(validationHandler(validation.get), authMiddleWare('getUsers', 'write'), traineeController.get)
    .post(validationHandler(validation.create), authMiddleWare('getUsers', 'write'), traineeController.create)
    .put(validationHandler(validation.update), authMiddleWare('getUsers', 'write'), traineeController.update);
traineeRouter.route('/upload')
    .post(upload.single('imageName'), traineeController.upload);
traineeRouter.route('/:id')
    .delete(validationHandler(validation.delete), authMiddleWare('getUsers', 'write'), traineeController.delete);
export default traineeRouter;
