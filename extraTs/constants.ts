import { IPermissions, IUsers } from './interfaces';
export const permissions: IPermissions = {
  getUsers: {
    all: ['head-trainer'],
    delete: [],
    read: ['trainee', 'trainer'],
    write: ['trainer'],
  },
};

export const users: IUsers[] = [{
  reviewerEmail: 'reviewe',
  traineeEmail: 'trainee1@successive.tech',
}];
