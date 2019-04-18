// TODO: check other categories like frontend, devops, etc.

const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const MongoClient = require('mongodb').MongoClient;
const db = require('./db');
import jobParser from './content';
import { sleep } from './common'


const url = "https://nofluffjobs.com/";
const category = [
    'backend',
    'fullstack',
    'mobile',
    'frontend',
    'testing',
    'devops',
    'hr',
    'trainee',
    'ux',
    'support',
    'project-manager',
    'business-analyst',
    'other'
];

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
    for(let iter = 0; iter < category.length; iter++) {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url + category[iter]);
        await page.waitFor(3000);
        let content = await page.content();
        
        var $ = cheerio.load(content);
    
        // get all links
        let links = $('.col-sm-12 .list-item ');
        for(var i = 0; i < links.length; i++) {
            jobLinks.push('https://nofluffjobs.com' + links[i].attribs.href);
        }
    
        console.log(`--> Got ${jobLinks.length} links from ${category[iter]}`);
        await browser.close();
    
        // parse 30 newest links, or less when not possible
        let parseLimit = 30;
        if(jobLinks.length < parseLimit) {
            parseLimit = jobLinks.length;
        }
        // check if parsed any links
        if(jobLinks.length != 0) {
            for(let i = 0; i < parseLimit; i++) {
                const timeCounter = Math.floor((Math.random() * 30000) + 2000);
        
                // check if link exists in db
                var exists = await db.getDB().collection(collection).countDocuments({"_id":jobLinks[i]});
                if(!exists) {
                    // save parsed data to db
                    db.getDB().collection(collection).insertOne(await jobParser(jobLinks[i], category[iter]));
                    console.log("Saved " + jobLinks[i] + " to db");
    
                    // wait before next parsing
                    console.log(`Waiting for ${timeCounter/1000} seconds`)
                    await sleep(timeCounter);
          
                } else {
                    console.log(jobLinks[i] + " already exists in db")
                }
            }
        } else {
            console.log("Error while getting links");
        }

        // Clear links array for another category
        jobLinks = [];
        
    }

    await closeDB();

})();
