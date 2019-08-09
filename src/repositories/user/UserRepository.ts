import * as mongoose from 'mongoose';
import IUserModel from './IUserModel';
import { UserModel } from './UserModel';
// import { IQueryGet } from '../user/entities'

export default class UserRepository {
    public UserModel;
    constructor() {
        this.UserModel = UserModel;
    }
    public get(query, projection, option) {
        return UserModel.find(query, projection, option);
    }
    public update(query, dataToUpdate) {
        return UserModel.update(query, dataToUpdate);
    }
    public create(data) {
        return UserModel.create(data);
    }
    public delete(data) {
        return UserModel.deleteMany(data);
    }
    public findOne(query) {
        return UserModel.findOne(query).lean();
    }

}
