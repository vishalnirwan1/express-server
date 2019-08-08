import UserRepository from '../repositories/user/UserRepository';

const userRepository = new UserRepository();
export default () => {
    console.log('inside seed data');
    const user = {
        name: 'Vishal',
        email: 'vishal@gmail.com',
    };
    userRepository.create(user)
        .then((res) => {
            console.log('user created --', res);
            userRepository.update({ name: 'Vishal' }, { name: 'Nirwan', email: 'nirwan@gmail.com' })
                .then((res) => {
                    console.log('user updated --', res);
                })
                .catch((err) => {
                    console.log('error issss', err);
                });
            userRepository.get({ name: 'Nirwan' }, undefined, undefined)
                .then((res) => {
                    console.log('user fetched --', res);
                })
                .catch((err) => {
                    console.log('error issss', err);
                });
            userRepository.delete({ name: 'Vishal' })
                .then((res) => {
                    console.log('user deleted --', res);
                })
                .catch((err) => {
                    console.log('error issss', err);
                });
        })
        .catch((err) => {
            console.log('error issss', err);
        });
};
