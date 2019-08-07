import * as mongoose from 'mongoose';

const kittySchema = new mongoose.Schema({
    name: String,
});

const Kitten = mongoose.model('Kitten', kittySchema);

class Database {
    public static open(mongoUri) {
        mongoose.connect(mongoUri, { useNewUrlParser: true }, (err) => {
            if (err) {
                console.log('error is ', err);
            }
            console.log('successfully connected to mongoose');
        });
        playwithMongo();
    }
}

function playwithMongo() {
    saveKitten({ name: 'Silence' })
    .then((res) => {
        console.log('the response is ', res);
    })
    .then((res) => {
        console.log('response of save kitten is ', res);
        return Kitten.find({ name: 'Silence' });
    })
    .then((res) => {
        console.log('kittens are ', res);
    })
    .catch((err) => {
        console.log('errorss is ', err);
    });
}
function saveKitten(data) {
    return new Promise((resolve, reject) => {
        const kitty = new Kitten(data);
        kitty.save((err, res) => {
            if (err) {
               return reject(err);
            }
            resolve(res);
        });
    });
}
export default Database;
