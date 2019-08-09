import * as bcrypt from 'bcrypt';
import * as mongoose from 'mongoose';
import { configuration } from '../config';
import { UserModel } from '../repositories/user/UserModel';
import UserRepository from '../repositories/user/UserRepository';

const userRepository = new UserRepository();
export default () => {

    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(configuration.password, salt);

    console.log('inside seed data');
    const user = {
        name: 'Vishal',
        email: 'vishal@gmail.com',
        password: hash,
    };

    UserModel.count({}, (err, count) => {
        console.log('count is -----', count);
        if (count === 0) {
            userRepository.create(user)
                .then((res) => {
                    console.log('user created --', res);
                    userRepository.update({ name: 'Vishal1' }, { name: 'Nirwan', email: 'nirwan@gmail.com' })
                        .then((res) => {
                            console.log('user updated --', res);
                        })
                        .catch((err) => {
                            console.log('error issss', err);
                        });
                    userRepository.get({ name: 'Vishal' }, undefined, undefined)
                        .then((res) => {
                            console.log('user fetched --', res);
                        })
                        .catch((err) => {
                            console.log('error issss', err);
                        });
                    // userRepository.delete({ name: 'Vishal' })
                    //     .then((res) => {
                    //         console.log('user deleted --', res);
                    //     })
                    //     .catch((err) => {
                    //         console.log('error issss', err);
                    //     });
                })
                .catch((err) => {
                    console.log('error issss', err);
                });
        }
    });
};
