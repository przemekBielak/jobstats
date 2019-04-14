// TODO: add save to db function
// TODO: close db function

const MongoClient = require('mongodb').MongoClient;

const mongoUrl = "mongodb://localhost:27017/";
const dbname =  "jobs";
const mongoOptions = { useNewUrlParser: true };

const state = {
    db: null
};

var dbclient = null;


const connect = (cb) => {
    if (state.db) {
        cb();
    } else {
        MongoClient.connect(mongoUrl, mongoOptions, (err, client) => {
            if (err) {
                cb(err);
            } else {
                state.db = client.db(dbname);
                dbclient = client;
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

const getDbClient = () => {
    return dbclient;
}

module.exports = {getDB, connect, getPrimaryKey, getDbClient};
