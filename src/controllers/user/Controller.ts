import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { configuration } from '../../config';
// import { Request, Response } from 'express';
import UserRepository from '../../repositories/user/UserRepository';
// import { validationHandler } from '../../libs';
const userRepository = new UserRepository();
class UserController {
    public login(req, res, next) {
        console.log('inside login -----', req.body);
        const { email, password } = req.body;
        userRepository.findOne({ email })
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
                console.log('user is ----', user);
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
        console.log('user in controller --->', req.user);
        res.send({
            status: 'ok',
            message: 'user fetched successfully',
            data: req.user,
        });
    }
}
const userController = new UserController();
export default userController;
    // public get(req: Request, res: Response) {
    //     console.log('inside get user');
    //     res.send([
    //         {
    //             name: 'fake response user',
    //         },
    //     ]);
    // }
    // public create(req: Request, res: Response) {
    //     console.log('inside create user');
    //     res.send({
    //         data: {
    //             id: req.body.id,
    //             name: req.body.name,
    //         },
    //         message: 'user create successful',
    //         status: 'ok',
    //     });
    // }
    // public update(req: Request, res: Response) {
    //     console.log('inside update user');
    //     res.send({
    //         data: {
    //             id: req.body.id,
    //             name: req.body.dataToUpdate.name,
    //         },
    //         message: 'user update successful',
    //         status: 'ok',
    //     });
    // }
    // public delete(req: Request, res: Response) {
    //     console.log('inside delete user');
    //     res.send({
    //         data: {
    //             id: req.params.id,
    //             name: req.params.name,
    //         },
    //         message: 'user delete successful',
    //         status: 'ok',
    //     });
    // }
