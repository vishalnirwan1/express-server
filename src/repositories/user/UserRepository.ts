import * as mongoose from 'mongoose';
import VersionableRepository from '../versionable/VersionableRepository';
import IUserModel from './IUserModel';
import { userModel } from './UserModel';
// import { IQueryGet } from '../user/entities'

export default class UserRepository extends VersionableRepository<IUserModel, mongoose.Model<IUserModel>> {
    constructor() {
        super(userModel);
    }
    public get(query) {
        return super.find(query);
    }
    public getAll(query, options) {
        return super.findAll(query, options);
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
}
