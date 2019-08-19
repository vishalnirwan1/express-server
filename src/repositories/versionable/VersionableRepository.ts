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
        const model = {
            ...options,
            _id: id,
            createdBy: options.userId,
            originalId: id,
            updatedBy: options.userId,

        };
        const record = await this.modelType.create(model);
        return record.toObject();
    }
    public async update(id, options) {
        let originalData;
        try {
            const findUpdate = await this.modelType.findOne({ originalId: id, deletedAt: { $exists: false } }).lean();
            if (!findUpdate) {
                return 'user not found for update';
            } else {
                originalData = findUpdate;
                const newId = VersionableRepository.generateObjectId();
                const modelCreate = new this.modelType({
                    ...originalData,
                    ...options,
                    _id: newId,
                });
                const record = await this.modelType.create(modelCreate);
                await record.toObject();
                const newestId = originalData._id;
                const modelUpdate = new this.modelType({
                    ...originalData,
                    deletedAt: Date.now(),
                });
                return this.modelType.updateOne({ _id: newestId }, modelUpdate);
            }
        } catch (err) {
            return err;
        }

    }
    public async delete(id) {
        let originalData;
        const findDelete = await this.modelType.findOne({ originalId: id, deletedAt: { $exists: false } }).lean();
        if (!findDelete) {
            return 'user not found in delete';
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
    public async findAll(query, options) {
        return this.modelType.find(query, undefined, options).populate('password').lean();
    }
}
