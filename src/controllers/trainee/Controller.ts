import { Request, Response } from 'express';
// import { validationHandler } from '../../libs';
class TraineeController {
    public get(req: Request, res: Response) {
        console.log('inside get trainee');
        res.send([
            {
                name: 'fake response',
            },
        ]);
    }
    public create(req: Request, res: Response) {
        console.log('inside create trainee');
        res.send({
            data: {
                id: req.body.id,
                name: req.body.name,
            },
            message: 'trainee create successful',
            status: 'ok',
        });
    }
    public update(req: Request, res: Response) {
        console.log('inside update trainee');
        res.send({
            data: {
                id: req.body.id,
                name: req.body.dataToUpdate.name,
            },
            message: 'trainee update successful',
            status: 'ok',
        });
    }
    public delete(req: Request, res: Response) {
        console.log('inside delete trainee');
        res.send({
            data: {
                id: req.params.id,
                name: req.params.name,
            },
            message: 'trainee delete successful',
            status: 'ok',
        });
    }

}
const traineeController = new TraineeController();
export default traineeController;
