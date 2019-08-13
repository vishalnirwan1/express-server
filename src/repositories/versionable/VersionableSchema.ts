import * as mongoose from 'mongoose';

export default class VersionableSchema extends mongoose.Schema {
    constructor(option: any, collections: any) {
        const versionSchema = Object.assign({
            createdAt: {
                default: Date.now,
                required: true,
                type: Date,
            },
            createdBy: {
                default: 'Vishal Nirwan',
                required: true,
                type: String,
            },
            deletedAt: {
                required: false,
                type: Date,
            },
            originalId: {
                required: true,
                type: String,
            },
            updatedAt: {
                default: Date.now,
                required: true,
                type: Date,
            },
            updatedBy: {
                default: 'Vishal Nirwan',
                required: true,
                type: String,
            },
            deletedBy: {
                required: false,
                type: String,
            },
            ...option,
        });
        super(versionSchema, option);
    }
}
