const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
import jobParser from './content';

const url = 'https://nofluffjobs.com/jobs/backend';
var jobLinks = [];

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

    (async() => {
        console.log(await jobParser(jobLinks[2]));
    })();

})();