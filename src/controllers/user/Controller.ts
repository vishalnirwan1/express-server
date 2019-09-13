import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { configuration } from '../../config';
import UserRepository from '../../repositories/user/UserRepository';
const userRepository = new UserRepository();
class UserController {
    public async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const userDetails = await userRepository.get({ email, deletedAt: { $exists: false } });
            if (!userDetails) {
                return next({
                    message: 'User not found',
                    status: 404,
                });
            }
            const { password: hashPassword } = userDetails;

            if (!(bcrypt.compareSync(password, hashPassword))) {
                return next({
                    message: 'Password does not match!!!!!',
                    status: 400,
                });
            }
            const token = jwt.sign(userDetails, configuration.secretKey, { expiresIn: '30m' });

            res.send({
                status: 200,
                message: 'Login successful',
                data: {
                    token,
                },
            });
        } catch (err) {
            next({
                message: err,
                status: 400,
            });
        }
    }

    public fetchUser(req, res) {
        res.send({
            status: 200,
            message: 'User fetched successfully',
            data: req.user,
        });
    }
    public async updateUser(req, res, next) {
        try {
            const { id, dataToUpdate } = req.body;
            const userUpdate = await userRepository.update({ _id: id }, dataToUpdate);
            if (userUpdate === 'user not found for update') {
                next({
                    message: userUpdate,
                    status: 404,
                });
            } else {
                res.send({
                    data: dataToUpdate,
                    message: 'user updated succesfully',
                    status: 200,
                });
            }
        } catch (err) {
            next({
                message: err,
                status: 400,
            });
        }
    }
    public async deleteUser(req, res, next) {
        try {
            const { userId } = req.body;
            const userDelete = await userRepository.delete({ _id: req.params.id }, userId );
            if (userDelete === 'user not found in delete') {
                next({
                    message: userDelete,
                    status: 404,
                });
            } else {
                res.send({
                    data: req.params.id,
                    message: 'user deleted succesfully',
                    status: 200,
                });
            }
        }
        catch (err) {
            next({
                message: err,
                status: 400,
            });
        }
    }
}
const userController = new UserController();
export default userController;
