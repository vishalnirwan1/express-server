import * as mongoose from 'mongoose';
import seedData from './seedData';

class Database {
    public static async open(mongoUri) {
        await mongoose.connect(mongoUri, { useNewUrlParser: true }, async (err) => {
            if (err) {
                console.log('error is ', err);
            }
            await seedData();
        });
    }
}
export default Database;
