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




// Program start here
db.connect((err) => {
    if(err) {
        console.log('Unable to connect to database');
        process.exit(1);
    } else {
        console.log('Connected to database');
    }
});

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url)
    let content = await page.content();
    await sleep(2000);

    var $ = cheerio.load(content);

    // get all links
    let links = $('.col-sm-12 .list-item ');
    for(var i = 0; i < links.length; i++) {
        jobLinks.push("https://nofluffjobs.com" + links[i].attribs.href);
    }

    console.log(`Got ${jobLinks.length} links`);
    await browser.close();

    // check if parsed any links
    if(jobLinks.length != 0) {
        for(let i = 3; i < 5; i++) {
            const timeCounter = Math.floor((Math.random() * 30000) + 2000);
    
            // check if link exists in db
            var exists = await db.getDB().collection(collection).countDocuments({"_id":jobLinks[i]});
            if(!exists) {
                // save parsed data to db
                db.getDB().collection(collection).insertOne(await jobParser(jobLinks[i]));
                console.log("Saved " + jobLinks[i] + " to db");

                // wait before next parsing
                await sleep(timeCounter);
      
            } else {
                console.log(jobLinks[i] + " already exists in db")
            }
        }
    } else {
        console.log("Error while getting links");
    }

    await closeDB();

})();

