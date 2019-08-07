import * as mongoose from 'mongoose';
import seedData from './seedData';

class Database {
    public static open(mongoUri) {
        mongoose.connect(mongoUri, { useNewUrlParser: true }, (err) => {
            if (err) {
                console.log('error is ', err);
            }
            console.log('successfully connected to mongoose');
            seedData();
        });
    }
}
export default Database;
