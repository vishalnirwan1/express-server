import * as mongoose from 'mongoose';
import VersionableRepository from '../versionable/VersionableRepository';
import IUserModel from './IUserModel';
import { userModel } from './UserModel';
// import { IQueryGet } from '../user/entities'

export default class UserRepository extends VersionableRepository<IUserModel, mongoose.Model<IUserModel>> {
    // public userModel;
    constructor() {
        super(userModel);
    }
    public get(query) {
        return super.find(query);
    }
    public update(query, dataToUpdate) {
        return super.update(query, dataToUpdate);
    }
    public create(data) {
        return super.create(data);
    }
    public delete(data) {
        return super.delete(data);
    }
    // public findOne(query) {
    //     return userModel.findOne(query).lean();
    // }

}
