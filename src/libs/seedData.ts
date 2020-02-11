import * as bcrypt from 'bcrypt';
import * as mongoose from 'mongoose';
import { configuration } from '../config';
import { userModel } from '../repositories/user/UserModel';
import UserRepository from '../repositories/user/UserRepository';

const userRepository = new UserRepository();
export default async () => {

    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(configuration.password, salt);

    const user = {
        name: 'Vishal',
        email: 'vishal@gmail.com',
        password: hash,
        role: 'head-trainer',
    };

    await userModel.countDocuments({}, async (err, count) => {
        try {
            if (count === 0) {
                const seedUser = await userRepository.createUser(user);
                if (seedUser) {
                    // console.log('user created --', seedUser);

                }
            }
        } catch (err) {
            console.log('error issss createee', err);
        }
    });
};
