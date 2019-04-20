const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const MongoClient = require('mongodb').MongoClient;

const APP_PORT = 8080;

const mongoUrl = "mongodb://localhost:27017/";
const mongoOptions = { useNewUrlParser: true };
const dbname =  "jobs";
const collection = "jobs";

var db = null;

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'build')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


app.post('/lang-count/', (req, res) => {
    var lang = req.body.lang;
    var city = req.body.city;

    if(city != "Any") {
        db.countDocuments(
            {
                $and:
                [
                    {"requirementsMustHave":lang}, 
                    {"companyLocationCity":city}
                ]
            }
        )
        .then((count) => res.json({count: count}))
        .catch((err) => console.log(err));
    }
    else {
        db.countDocuments(
            {"requirementsMustHave":lang}
        )
        .then((count) => res.json({count: count}))
        .catch((err) => console.log(err));
    }

});


// Program start here
MongoClient.connect(mongoUrl, mongoOptions)
.then((client) => {
    // update global db instance
    db = client.db(dbname).collection(collection);

    // start serving application
    app.listen(process.env.PORT || 8080, () => {
        console.log('Connected to database, listening on port ' + APP_PORT);
    })
})
.catch((err) => {
    console.log(err);
    process.exit(1);
});