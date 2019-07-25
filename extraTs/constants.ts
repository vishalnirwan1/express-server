import { IPermissions } from './interfaces';
export const permissions: IPermissions = {
  getUsers: {
    all: ['head-trainer'],
    delete: [],
    read: ['trainee', 'trainer'],
    write: ['trainer'],
  },
};

export const users = [{
  reviewerEmail: 'reviewe',
  traineeEmail: 'trainee1@successive.tech',
}];
