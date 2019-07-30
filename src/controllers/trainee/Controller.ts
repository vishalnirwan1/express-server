import { Request, Response } from 'express';
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
                id: 1,
                name: 'Vishal',
            },
            message: 'trainee create successful',
            status: 'ok',
        });
    }
    public update(req: Request, res: Response) {
        console.log('inside update trainee');
        res.send({
            data: {
                id: 1,
                name: 'Vishal',
            },
            message: 'trainee update successful',
            status: 'ok',
        });
    }
    public delete(req: Request, res: Response) {
        console.log('inside delete trainee');
        res.send({
            data: {
                id: 1,
                name: 'Vishal',
            },
            message: 'trainee delete successful',
            status: 'ok',
        });
    }

}
const traineeController = new TraineeController();
export default traineeController;
