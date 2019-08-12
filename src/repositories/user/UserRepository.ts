import * as mongoose from 'mongoose';
import VersionableRepository from '../versionable/VersionableRepository';
import IUserModel from './IUserModel';
import { userModel } from './UserModel';
// import { IQueryGet } from '../user/entities'

export default class UserRepository extends VersionableRepository<IUserModel, mongoose.Model<IUserModel>> {
    public userModel;
    constructor() {
        console.log('>>>>>>hihihih', userModel);
        super(userModel);
    }
    public get(query, projection, option) {
        return userModel.find(query, projection, option);
    }
    public update(query, dataToUpdate) {
        return userModel.update(query, dataToUpdate);
    }
    public create(data) {
        return super.create(data);
    }
    public delete(data) {
        return userModel.deleteMany(data);
    }
    public findOne(query) {
        return userModel.findOne(query).lean();
    }

}
