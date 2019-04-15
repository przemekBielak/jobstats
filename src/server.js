// parse link only if link not in db

const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const MongoClient = require('mongodb').MongoClient;
const db = require('./db');
import jobParser from './content';
import { sleep } from './common'

const url = 'https://nofluffjobs.com/jobs/backend';
var jobLinks = [];

// db related
const collection = "jobs";

async function closeDB() {
    return new Promise(resolve => db.getDbClient().close());
}

db.connect((err) => {
    if(err) {
        console.log('unable to connect to database');
        process.exit(1);
    } else {
        console.log('connected to database');
    }
});

// main program function
(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    
    let content = await page.content();

    await sleep(function() {
        console.log('loading');
    }, 2000);

    var $ = cheerio.load(content);

    // get all links
    let links = $('.col-sm-12 .list-item ');
    for(var i = 0; i < links.length; i++) {
        jobLinks.push("https://nofluffjobs.com" + links[i].attribs.href);
    }

    await browser.close();

    // check if parsed any links
    if(jobLinks.length != 0) {
        for(let i = 30; i < 31; i++) {
            const timeCounter = Math.floor((Math.random() * 20000) + 10000);
    
            try {
                var exists = await db.getDB().collection(collection).countDocuments({"_id":jobLinks[i]});
            } catch(e) {
                console.log(e);
            }
    
            if(!exists) {
                // save parsed data to db
                try {
                    db.getDB().collection(collection).insertOne(await jobParser(jobLinks[i]), function(err, res) {
                        if (err) throw err;
                        console.log("Saved " + jobLinks[i] + " to db.");
                    });
                } catch(e) {
                    console.log(e);
                }
        
                // wait before next parsing
                try {
                    await sleep(function() {
                        console.log('...')
                    }, timeCounter);
                } catch(e) {
                    console.log(e);
                }
            } else {
                console.log(jobLinks[i] + " already exists in db.")
            }
    
        }
    } else {
        console.log("error while getting links");
    }

    await closeDB();

})();

