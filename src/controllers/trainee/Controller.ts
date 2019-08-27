import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import UserRepository from '../../repositories/user/UserRepository';
const userRepository = new UserRepository();

class TraineeController {
    public async get(req: Request, res: Response) {
        try {
            const query = { role: 'trainee', deletedAt: { $exists: false } };
            const traineeList = await userRepository.getAll(query, req.query);
            const count: number = traineeList.length;
            console.log('inside get trainee');

            res.send([
                {
                    count,
                    status: 200,
                    message: 'all trainees fetched',
                    data: traineeList,
                },
            ]);
        } catch (err) {
            res.send({
                message: err,
                status: 400,
            });
        }
    }
    public async create(req: Request, res: Response) {
        try {
            console.log('inside create trainee');
            const saltRounds = 10;
            const salt = bcrypt.genSaltSync(saltRounds);
            const hash = bcrypt.hashSync(req.body.password, salt);
            req.body.password = hash;
            const createTrainee = await userRepository.create(req.body);
            res.send({
                data: {
                    name: createTrainee,
                },
                message: 'trainee create successful',
                status: 200,
            });
        } catch (err) {
            res.send({
                message: err,
                status: 400,
            });
        }
    }
    public async update(req: Request, res: Response) {
        try {
            console.log('inside update trainee');
            const { id, dataToUpdate } = req.body;
            if (dataToUpdate.password !== ' ') {
                const saltRounds = 10;
                const salt = bcrypt.genSaltSync(saltRounds);
                const hash = bcrypt.hashSync(dataToUpdate.password, salt);
                dataToUpdate.password = hash;
            }
            const updateTrainee = await userRepository.update(id, dataToUpdate);
            if (updateTrainee === 'user not found for update') {
                res.send({
                    message: updateTrainee,
                    status: '404',
                });
            } else {
                res.send({
                    data: req.body,
                    message: 'trainee update successful',
                    status: 200,
                });
            }
        } catch (err) {
            res.send({
                message: err,
                status: 400,
            });
        }
    }
    public async delete(req: Request, res: Response) {
        try {
            console.log('inside delete trainee');
            const userDelete = await userRepository.delete({ _id: req.params.id });
            if (userDelete === 'user not found in delete') {
                res.send({
                    message: userDelete,
                    status: '404',
                });
            } else {
                res.send({
                    data: {
                        id: req.params.id,
                        name: req.params.name,
                    },
                    message: 'trainee delete successful',
                    status: 200,
                });
            }
        } catch (err) {
            res.send({
                message: err,
                status: 400,
            });
        }
    }
}

const traineeController = new TraineeController();
export default traineeController;
