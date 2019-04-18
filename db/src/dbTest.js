const db = require('./db');
const collection = "jobs";
const MongoClient = require('mongodb').MongoClient;

db.connect((err) => {
    if(err) {
        console.log('unable to connect to database');
        process.exit(1);
    } else {
        console.log('connected to database');
        db.getDB().collection(collection).insertOne({"date": new Date()}, (err, documents) => {
            if(err) {
                console.log(err);
            } else {
                console.log(documents);
            }
        });
        
        db.getDbClient().close();
    }
});
