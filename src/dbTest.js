const db = require('./db');
const collection = "jobs";

db.connect((err) => {
    if(err) {
        console.log('unable to connect to database');
        process.exit(1);
    } else {
        console.log('connected to database');
        db.getDB().collection(collection).find({}).toArray((err, documents) => {
            if(err) {
                console.log(err);
            } else {
                console.log(documents);
            }
        });
        
        db.getDbClient().close();
    }
});
