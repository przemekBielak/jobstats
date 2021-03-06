// TODO: close db

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const MongoClient = require('mongodb').MongoClient;

const APP_PORT = 8082;

const mongoUrl = "mongodb://localhost:27017/";
const mongoOptions = { useNewUrlParser: true };
const dbname =  "jobs";
const collection = "jobs";

// Global db instance
let db = null;

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'build')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


app.post('/lang-count/', (req, res) => {
    let lang = req.body.lang;
    let city = req.body.city;
    let seniority = req.body.seniority;
    let contract = req.body.contract;

    let salaryMinAvg = 0;
    let salaryMaxAvg = 0;
    let salaryMinSum = 0;
    let salaryMaxSum = 0;
    let salaryCounter = 0;

    let mustHaveRequirements = {};
    let mustHaveRequirementsSorted = [];

    let requirementsNices = {};
    let requirementsNicesSorted = [];

    let os = {
        mac: 0,
        windows: 0,
        linux: 0
    };

    // Not active query when Any city selected
    if(city == "Any") {
        city = {$exists: true};
    }
    if(seniority == "Any") {
        seniority = {$exists: true};
    }
    if(lang == "Any") {
        lang = {$exists: true};
    }

    db.find({
        $and:
        [
            {"requirementsMustHave":lang}, 
            {"companyLocationCity":city},
            {"seniorityLevel": seniority},
        ]
    })
    .toArray((err, docs) => {

        docs.forEach(doc => {

            // get type of OS
            if(doc.os.mac == true) {
                os.mac++;
            }
            if(doc.os.windows == true) {
                os.windows++;
            }
            if(doc.os.linux == true) {
                os.linux++;
            }

            // get min and max salaries
            doc.salary.forEach(salary => {
                if(salary.contractType == contract && salary.salaryCurrency == 'PLN') {
                    if(salary.salaryRate == 'month') {
                        salaryCounter++;
                        salaryMinSum += salary.salaryMin;
                        salaryMaxSum += salary.salaryMax;
                    }
                    else if(salary.salaryRate == 'day') {
                        salaryCounter++;
                        salaryMinSum += salary.salaryMin * 20;
                        salaryMaxSum += salary.salaryMax * 20;
                    }
                    else if(salary.salaryRate == 'hour') {
                        salaryCounter++;
                        salaryMinSum += salary.salaryMin * 160;
                        salaryMaxSum += salary.salaryMax * 160;
                    }
                    else if(salary.salaryRate == 'year') {
                        salaryCounter++;
                        salaryMinSum += salary.salaryMin / 12;
                        salaryMaxSum += salary.salaryMax / 12;
                    }
                }
            })
            // calculate avarage salary
            salaryMinAvg = salaryMinSum/salaryCounter;
            salaryMaxAvg = salaryMaxSum/salaryCounter;

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

            // get nice to have requirements
            doc.requirementsNices.forEach(req => {
                if(req == lang) {
                    // do nothing
                }
                else if(req in requirementsNices) {
                    requirementsNices[req] += 1;
                }
                else {
                    requirementsNices[req] = 1;
                }
            });
        });

        // sort requirements and get the most frequent requirements
        for (key in mustHaveRequirements) {
            mustHaveRequirementsSorted.push([key, mustHaveRequirements[key]]);
        }
        mustHaveRequirementsSorted.sort((a, b) => {
            return b[1] - a[1];
        })

        // sort requirements and get the most frequent requirements
        for (key in requirementsNices) {
            requirementsNicesSorted.push([key, requirementsNices[key]]);
        }
        requirementsNicesSorted.sort((a, b) => {
            return b[1] - a[1];
        })

        // count all of the matching documents
        db.countDocuments({
            $and:
            [
                {"requirementsMustHave":lang}, 
                {"companyLocationCity":city},
                {"seniorityLevel": seniority}
            ]
        })
        .then(count => res.json({
            count: count,
            salaryMinAvg: Math.round(salaryMinAvg),
            salaryMaxAvg: Math.round(salaryMaxAvg),
            mustHaveRequirements: mustHaveRequirementsSorted.slice(0, 10),
            requirementsNices: requirementsNicesSorted.slice(0, 10),
            os: os
        }))
        .catch(err => console.log(err));
    });

    
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
