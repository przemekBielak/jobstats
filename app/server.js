const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./db');

const APP_PORT = 8080;

const collection = "jobs";

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'build')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.post('/lang-count/', (req, res) => {
    var lang = req.body.lang

    db.getDB().collection(collection).countDocuments({"requirementsMustHave":lang}, (err, count) => {
        if(err) {
            console.log(err);
        } else {
            res.json({count: count});
        }
    });
});

// Program start here
db.connect((err) => {
    if(err) {
        console.log('Unable to connect to database');
        process.exit(1);
    } else {
        app.listen(process.env.PORT || 8080, () => {
            console.log('Connected to database, listening on port ' + APP_PORT);
        })
    }
});

