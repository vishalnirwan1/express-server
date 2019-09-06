import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { userModel } from '../../repositories/user/UserModel';
import UserRepository from '../../repositories/user/UserRepository';

const userRepository = new UserRepository();

class TraineeController {
    public async get(req: Request, res: Response, next) {
        try {
            const countQuery = { role: 'trainee', deletedAt: { $exists: false } };
            const allTrainees = await userRepository.getAll(countQuery, undefined);
            const count: number = allTrainees.length;
            const query = { role: 'trainee', deletedAt: { $exists: false } };
            const traineeList = await userRepository.getAll(query, req.query);
            console.log('inside get trainee');

            res.send([
                {
                    count,
                    status: 200,
                    message: 'All trainees fetched successfully',
                    data: traineeList,
                },
            ]);
        } catch (err) {
            next({
                message: err,
                status: 400,
            });
        }
    }
    public async create(req: Request, res: Response, next) {
        try {
            const { email, password } = req.body;
            console.log('inside create trainee');
            userModel.countDocuments({ email, deletedAt: { $exists: false } }, async (err, count) => {
                if (count === 0) {
                    const saltRounds = 10;
                    const salt = bcrypt.genSaltSync(saltRounds);
                    const hash = bcrypt.hashSync(password, salt);
                    req.body.password = hash;
                    const createTrainee = await userRepository.create(req.body);
                    res.send({
                        data: {
                            details: createTrainee,
                        },
                        message: 'Trainee created successfully',
                        status: 200,
                    });
                }
                else {
                    next({
                        message: 'Trainee already exists with this email id',
                        status: 400,
                    });
                }
            });
        } catch (err) {
            next({
                message: err,
                status: 400,
            });
        }
    }
    public async update(req: Request, res: Response, next) {
        try {
            console.log('inside update trainee');
            const { id, dataToUpdate, userId } = req.body;
            const { name, email, password } = dataToUpdate;
            const updateQuery = { email, deletedAt: { $exists: false }, originalId: { $ne: id } };
            if (email) {
                userModel.countDocuments(updateQuery, async (err, count) => {
                    if (count !== 0) {
                        next({
                            message: 'Trainee already exists with this email id',
                            status: 400,
                        });
                    }
                });
            }
            if (dataToUpdate.password !== undefined) {
                const saltRounds = 10;
                const salt = bcrypt.genSaltSync(saltRounds);
                const hash = bcrypt.hashSync(dataToUpdate.password, salt);
                dataToUpdate.password = hash;
            }
            const updateTrainee = await userRepository.update(id, { dataToUpdate, userId });
            if (updateTrainee) {
                if (password === undefined || email !== undefined || name !== undefined) {
                    res.send({
                        data: { id, name, email },
                        message: 'Trainee updated successfully',
                        status: 200,
                    });
                } else {
                    res.send({
                        data: { id },
                        message: 'Password updated successfully',
                        status: 200,
                    });
                }
            }
        }
        catch (err) {
            next({
                message: err.message,
                status: 404,
            });
        }
    }
    public async delete(req: Request, res: Response, next) {
        try {
            const { id } = req.params;
            const { userId } = req.body;
            console.log('inside delete trainee');
            const userDelete = await userRepository.delete({ _id: id }, userId);
            if (userDelete) {
                res.send({
                    data: {
                        id,
                    },
                    message: 'Trainee deleted successfully',
                    status: 200,
                });
            }
        } catch (err) {
            next({
                message: err.message,
                status: 404,
            });
        }
    }
}

const traineeController = new TraineeController();
export default traineeController;
