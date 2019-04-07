const request = require('request');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const url = 'https://nofluffjobs.com/';
const fs = require('fs');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    
    let content = await page.content();
    var $ = cheerio.load(content);

    fs.writeFile('content.txt', content, function(err) {
        if(err) {
            return console.log(err);
        }

        console.log('Done');
    })

    await browser.close();
})();