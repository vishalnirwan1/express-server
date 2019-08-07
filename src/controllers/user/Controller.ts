import { Request, Response } from 'express';
// import { validationHandler } from '../../libs';
class UserController {
    public get(req: Request, res: Response) {
        console.log('inside get user');
        res.send([
            {
                name: 'fake response user',
            },
        ]);
    }
    public create(req: Request, res: Response) {
        console.log('inside create user');
        res.send({
            data: {
                id: req.body.id,
                name: req.body.name,
            },
            message: 'user create successful',
            status: 'ok',
        });
    }
    public update(req: Request, res: Response) {
        console.log('inside update user');
        res.send({
            data: {
                id: req.body.id,
                name: req.body.dataToUpdate.name,
            },
            message: 'user update successful',
            status: 'ok',
        });
    }
    public delete(req: Request, res: Response) {
        console.log('inside delete user');
        res.send({
            data: {
                id: req.params.id,
                name: req.params.name,
            },
            message: 'user delete successful',
            status: 'ok',
        });
    }

}
const userController = new UserController();
export default userController;
