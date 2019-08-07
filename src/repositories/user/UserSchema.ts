import * as mongoose from 'mongoose';

export default class UserSchema extends mongoose.Schema {
    constructor(option: any) {
        const baseSchema = {
            name: {
                reuqired: true,
                type: String,
            },
            email: {
                reuqired: true,
                type: String,
            },
        };
        super(baseSchema, option);
    }
}
