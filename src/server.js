const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const MongoClient = require('mongodb').MongoClient;
import jobParser from './content';

const mongoUrl = "mongodb://localhost:27017/mycustomers";
const url = 'https://nofluffjobs.com/jobs/backend';
var jobLinks = [];

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function sleep(fn, time, ...args) {
    await timeout(time);
    return fn(...args);
}

function saveData(data) {
    MongoClient.connect(mongoUrl, { useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        
        var dbo = db.db("jobs");
            
        dbo.collection("jobs").insertOne(data, function(err, res) {
            if (err) throw err;
            console.log("Success!");
            db.close();
        });
    });
}


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

    saveData(await jobParser(jobLinks[11]));

    // for(let i = 0; i < 2; i++) {
    //     const timeCounter = Math.floor((Math.random() * 20000) + 10000);
    //     // console.log(await jobParser(jobLinks[i]));
    //     saveData(await jobParser(jobLinks[i]));
    //     await sleep(function() {
    //         console.log('...')
    //     }, timeCounter);

    // }
    
    // const timeCounter = Math.floor((Math.random() * 20000) + 10000);
    // console.log(await jobParser(jobLinks[0]));
    // await sleep(function() {
    //     console.log('...')
    // }, timeCounter);
    // console.log(await jobParser(jobLinks[1]));

})();