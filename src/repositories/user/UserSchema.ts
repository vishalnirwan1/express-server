import VersionableSchema from '../versionable/VersionableSchema';

export default class UserSchema extends VersionableSchema {
    constructor(option: any) {
        const baseSchema = {
            _id: String,
            name: {
                required: true,
                type: String,
            },
            email: {
                required: true,
                type: String,
            },
            password: {
                required: true,
                type: String,
            },
        };
        super(baseSchema, option);
    }
}
