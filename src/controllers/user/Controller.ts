import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { configuration } from '../../config';
// import { Request, Response } from 'express';
import UserRepository from '../../repositories/user/UserRepository';
// import { validationHandler } from '../../libs';
const userRepository = new UserRepository();
class UserController {
    public login(req, res, next) {
        const { email, password } = req.body;
        userRepository.get({ email, deletedAt: { $exists: false } })
            .then((user) => {
                if (!user) {
                    return next('user not founddd ');
                }
                const { password: hashPassword } = user;

                if (!(bcrypt.compareSync(password, hashPassword))) {
                    return next('password does not match!!!!!');
                }
                const token = jwt.sign(user, configuration.secretKey);
                console.log('token is -----', token);
                res.send({
                    status: 'ok',
                    message: 'login successful',
                    data: {
                        token,
                    },
                });
            });
    }
    public fetchUser(req, res) {
        res.send({
            status: 'ok',
            message: 'user fetched successfully',
            data: req.user,
        });
    }
    public updateUser(req, res, next) {
        userRepository.update({ _id: req.body.id }, req.body.dataToUpdate)
            .then((ressss) => {
                if (ressss === 'user not found') {
                    next({
                        message: ressss,
                        status: '404',
                    });
                } else {
                    res.send({
                        data: req.body.dataToUpdate,
                        message: 'user updated succesfully',
                        status: '200',
                    });
                }
            });
    }
    public deleteUser(req, res, next) {
        userRepository.delete({ _id: req.params.id })
            .then((result) => {
                if (result === 'user not found in delete') {
                    next({
                        message: result,
                        status: '404',
                    });
                } else {
                    res.send({
                        data: req.params.id,
                        message: 'user deleted succesfully',
                        status: '200',
                    });
                }
            })
            .catch((err) => {
                res.send({
                    error: err,
                    message: 'data could not be deleted',
                    status: 400,
                });
            });
    }
}
const userController = new UserController();
export default userController;
