const MongoClient = require('mongodb').MongoClient;

const mongoUrl = "mongodb://localhost:27017/mycustomers";
const dbname =  "jobs";
const mongoOptions = { useNewUrlParser: true };

const state = {
    db: null
}

const connect = (cb) => {
    if (state.db) {
        cb();
    } else {
        MongoClient.connect(mongoUrl, mongoOptions, (err, client) => {
            if (err) {
                cb(err);
            } else {
                state.db = client.db(dbname);
                cb();
            }
        });
    }
};

const getPrimaryKey = (_id) => {
    return ObjectID(_id);
}

const getDB = () => {
    return state.db;
}


module.exports = {getDB, connect, getPrimaryKey};