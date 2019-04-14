const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const MongoClient = require('mongodb').MongoClient;
const db = require('./db');
import jobParser from './content';

const url = 'https://nofluffjobs.com/jobs/backend';
var jobLinks = [];

const collection = "jobs";

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function sleep(fn, time, ...args) {
    await timeout(time);
    return fn(...args);
}


// connect to database
db.connect((err) => {
    if(err) {
        console.log('unable to connect to database');
        process.exit(1);
    } else {
        console.log('connected to database');
    }
});

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    
    let content = await page.content();
    var $ = cheerio.load(content);

    // get all links
    let links = $('.col-sm-12 .list-item ');
    for(var i = 0; i < links.length; i++) {
        jobLinks.push("https://nofluffjobs.com" + links[i].attribs.href);
    }

    await browser.close();
    console.log(jobLinks);

    for(let i = 13; i < 14; i++) {
        const timeCounter = Math.floor((Math.random() * 20000) + 10000);

        // save parsed data to db
        db.getDB().collection("jobs").insertOne(await jobParser(jobLinks[i]), function(err, res) {
            if (err) throw err;
            console.log("Saved " + jobLinks[i] + " to db.");
        });

        // wait before next parsing
        await sleep(function() {
            console.log('...')
        }, timeCounter);
    }

    db.close();

})();