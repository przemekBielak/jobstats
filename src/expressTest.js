const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./db');

const collection = "jobs";

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/api', (req, res) => {
    db.getDB().collection(collection).find({"requirementsMustHave":"Java"}).toArray( (err, documents) => {
        if(err) {
            console.log(err);
        } else {
            console.log(documents);
            res.json(documents);
        }
    });
});

// Program start here
db.connect((err) => {
    if(err) {
        console.log('Unable to connect to database');
        process.exit(1);
    } else {
        app.listen(3000, () => {
            console.log('Connected to database, listening on port 3000');
        })
    }
});

