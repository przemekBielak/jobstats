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

    let links = $('.col-sm-12 .list-item');
    for(var i = 0; i < links.length; i++) {
        console.log(links[i].attribs.href);
    }

    fs.writeFile('content.txt', links, function(err) {
        if(err) {
            return console.log(err);
        }

        console.log('Done');
    })

    await browser.close();
})();