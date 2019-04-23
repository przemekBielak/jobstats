// TODO: close db

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const MongoClient = require('mongodb').MongoClient;

const APP_PORT = 8080;

const mongoUrl = "mongodb://localhost:27017/";
const mongoOptions = { useNewUrlParser: true };
const dbname =  "jobs";
const collection = "jobs";

// Global db instance
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
    var seniority = req.body.seniority;
    var contract = req.body.contract;

    var salaryMinAvg = 0;
    var salaryMaxAvg = 0;
    var salaryMinSum = 0;
    var salaryMaxSum = 0;
    var salaryCounter = 0;

    var mustHaveRequirements = {};
    var mustHaveRequirementsSorted = [];

    // Not active query for city when Any city selected
    if(city == "Any") {
        city = {$exists: true};
    }

    db.find({
        $and:
        [
            {"requirementsMustHave":lang}, 
            {"companyLocationCity":city}
        ]
    })
    .toArray((err, docs) => {
        docs.forEach(doc => {
            doc.salary.forEach(salary => {
                if(salary.salaryRate == 'month' && salary.contractType == 'UoP') {
                    salaryCounter++;
                    salaryMinSum += salary.salaryMin;
                    salaryMaxSum += salary.salaryMax;
                }
            })

            // get must have requirements
            doc.requirementsMustHave.forEach(req => {
                if(req == lang) {
                    // do nothing
                }
                else if(req in mustHaveRequirements) {
                    mustHaveRequirements[req] += 1;
                }
                else {
                    mustHaveRequirements[req] = 1;
                }
            });
        });

        // calculate avarages
        salaryMinAvg = salaryMinSum/salaryCounter;
        salaryMaxAvg = salaryMaxSum/salaryCounter;

        // sort and get max values
        for (key in mustHaveRequirements) {
            mustHaveRequirementsSorted.push([key, mustHaveRequirements[key]]);
        }
        mustHaveRequirementsSorted.sort((a, b) => {
            return a[1] - b[1];
        })

        console.log(mustHaveRequirementsSorted.slice(-15, -1));
    });

    db.countDocuments({
        $and:
        [
            {"requirementsMustHave":lang}, 
            {"companyLocationCity":city}
        ]
    })
    .then(count => res.json({
        count: count,
        salaryMinAvg: salaryMinAvg,
        salaryMaxAvg: salaryMaxAvg
    }))
    .catch(err => console.log(err));
});

app.get('/must-have-list/', (req, res) => {
    db.findOne(
        {"_id":"requirementsMustHaveAll"}
    )
    .then(doc => {
        res.json(doc);
    })
    .catch(err => console.log(err));
});

app.get('/cities-list/', (req, res) => {
    db.findOne(
        {"_id":"citiesAll"}
    )
    .then(doc => {
        res.json(doc);
    })
    .catch(err => console.log(err));
});

// Program start here
MongoClient.connect(mongoUrl, mongoOptions)
.then((client) => {
    // update global db instance
    db = client.db(dbname).collection(collection);

    // start serving application
    app.listen(process.env.PORT || APP_PORT, () => {
        console.log('Connected to database, listening on port ' + APP_PORT);
    })
})
.catch((err) => {
    console.log(err);
    process.exit(1);
});