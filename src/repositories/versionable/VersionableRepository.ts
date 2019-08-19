import * as mongoose from 'mongoose';
// import UserRepository from '../user/UserRepository';

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
        const model = {
            ...options,
            _id: id,
            createdBy: options.userId,
            originalId: id,
            updatedBy: options.userId,

        };
        return this.modelType.create(model).then((record) => record.toObject());
    }
    public async update(id, options) {
        let originalData;
        const findUpdate = await this.modelType.findOne({ originalId: id, deletedAt: { $exists: false } }).lean()
            .then((data) => {
                if (!data) {
                    throw new Error('user not found for uodate');
                }
                originalData = data;
            })
            .then(() => {
                const id = VersionableRepository.generateObjectId();
                const modelCreate = new this.modelType({
                    ...originalData,
                    ...options,
                    _id: id,
                });
                return this.modelType.create(modelCreate).then((record) => record.toObject());
            })
            .then(() => {
                const newId = originalData._id;
                const modelUpdate = new this.modelType({
                    ...originalData,
                    deletedAt: Date.now(),
                });
                console.log(modelUpdate);
                return this.modelType.updateOne({ _id: newId }, modelUpdate);
            })
            .catch((err) => {
                return err;
            });
        return findUpdate;
    }
    public async delete(id) {
        let originalData;
        const findDelete = await this.modelType.findOne({ originalId: id, deletedAt: { $exists: false } }).lean();
        if (!findDelete) {
            throw new Error('user not found in delete');
        }
        else {
            originalData = findDelete;
            const newId = originalData._id;
            const modelDelete = new this.modelType({
                ...originalData,
                deletedAt: Date.now(),
            });

            return this.modelType.updateOne({ _id: newId }, modelDelete);
        }
    }
    public async find(query) {
        return this.modelType.findOne(query).lean();
    }
}
