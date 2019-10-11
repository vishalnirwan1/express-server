import * as mongoose from 'mongoose';

export default class VersionableRepository<D extends mongoose.Document, M extends mongoose.Model<D>> {
    public static generateObjectId() {
        return String(mongoose.Types.ObjectId());
    }
    private modelType: M;

    constructor(modelType) {
        this.modelType = modelType;
    }

    public async createUpload(options): Promise<D> {
        console.log('@@@@@@@@@', options);
        const id = VersionableRepository.generateObjectId();
        const model = {
            ...options,
            _id: id,
            name: 'vidhal',
            email: 'fvfv@gmail.com',
            password: '123',
            originalId: id,
            createdBy: 'me',

        };
        const record = await this.modelType.create(model);
        return record.toObject();
    }

    public async createUser(options): Promise<D> {
        const id = VersionableRepository.generateObjectId();
        const model = {
            ...options,
            _id: id,
            createdBy: id,
            originalId: id,

        };
        const record = await this.modelType.create(model);
        return record.toObject();
    }
    public async create(options): Promise<D> {
        const id = VersionableRepository.generateObjectId();
        const model = {
            ...options,
            _id: id,
            createdBy: options.userId,
            originalId: id,
            role: 'trainee',

        };
        const record = await this.modelType.create(model);
        const newRecord = record.toObject();
        delete newRecord.password;
        delete newRecord.__v;
        return newRecord;
    }

    public async update(id, options) {
        let originalData;
        const findUpdate = await this.modelType.findOne({ originalId: id, deletedAt: { $exists: false }} ).lean();
        if (!findUpdate) {
            throw new Error('trainee not found for update');
        } else {
            originalData = findUpdate;
            const newId = VersionableRepository.generateObjectId();
            const modelCreate = new this.modelType({
                ...originalData,
                ...options.dataToUpdate,
                _id: newId,
            });
            const record = await this.modelType.create(modelCreate);
            await record.toObject();
            const newestId = originalData._id;
            const modelUpdate = new this.modelType({
                ...originalData,
                updatedBy: options.userId,
                updatedAt: Date.now(),
                deletedAt: Date.now(),
            });
            return this.modelType.updateOne({ _id: newestId }, modelUpdate);
        }

    }

    public async delete(id, userId) {
        let originalData;
        const findDelete = await this.modelType.findOne({ originalId: id, deletedAt: { $exists: false } }).lean();
        if (findDelete) {
            originalData = findDelete;
            const newId = originalData._id;
            const modelDelete = new this.modelType({
                ...originalData,
                deletedBy: userId,
                deletedAt: Date.now(),
            });

            return this.modelType.updateOne({ _id: newId }, modelDelete);
        } else {
            throw new Error('user not found for delete');
        }
    }

    public async find(query) {
        return this.modelType.findOne(query, '-__v').lean();
    }
    public async findAll(query, options) {
        return this.modelType.find(query, '-__v -password ', options).sort({ name : 1 }).lean();
    }
}
