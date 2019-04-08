const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const url = 'https://nofluffjobs.com//job/machine-learning-engineer-bytedance-tiktok-u1rwecbs';
const fs = require('fs');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    
    let content = await page.content();
    var $ = cheerio.load(content, {"waitUntil" : "networkidle0"});

    // get all links
    const position = $('.posting-header-description h1').text();

    let info = []
    const other = $('.posting-header-description dd').each(function(i, elem) {
        // console.log($(this).text());
        info[i] = $(this).text();
    });

    const companyName = info[0];
    const companySize = info[1];
    const companyLocation = info[2];
    const whenToStart = info[3];
    const typeOfContract = info[4];
    const seniorityLevel = info[5];

    await browser.close();
})();   