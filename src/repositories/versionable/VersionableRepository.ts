import * as mongoose from 'mongoose';

export default class VersionableRepository<D extends mongoose.Document, M extends mongoose.Model<D>> {
    public static generateObjectId() {
        return String(mongoose.Types.ObjectId());
    }

    private modelType: M;

    constructor(modelType) {
        this.modelType = modelType;
    }

    public async create(options): Promise<D> {
        const id = VersionableRepository.generateObjectId();
        const addUser = { 
            ...options,
            _id: id,
            createdBy: options.userId,
            originalId: id,
            updatedBy: options.userId
        }
        console.log('imp data', addUser, typeof id, );
        // this.modelType.save(addUser)
        const model = new this.modelType(addUser);
        return model.save().then((record) => record.toObject());
    }
}
