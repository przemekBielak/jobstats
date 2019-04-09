const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const url = 'https://nofluffjobs.com/job/node-js-developer-astek-polska-fa3oeqn7?criteria=category%253Dbackend';
const fs = require('fs');

jobInfo = {
    salaryMin: 0,
    salaryMax: 0,
    salaryCurrency: ' ',
    salaryInfo: '',
};

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    
    let content = await page.content();
    var $ = cheerio.load(content, {"waitUntil" : "networkidle0"});

    // get all links
    const position = $('.posting-header-description h1').text();

    let info = []
    $('.posting-header-description dd').each(function(i, elem) {
        // console.log($(this).text());
        info[i] = $(this).text();
    });

    const salary = $('.posting-main-info h4').text().split(' ');
    // remove - sign from array
    for(var i = 0; i < salary.length; i++) {
        if(salary[i] === '-') {
            salary.splice(i, 1);
        }
    }
    jobInfo.salaryMin = salary[0];
    jobInfo.salaryMax = salary[1];
    jobInfo.salaryCurrency = salary[2];
    jobInfo.salaryInfo = $('.posting-main-info p').text();
    console.log(jobInfo);

    const companyName = info[0];
    const companySize = info[1];
    const companyLocation = (info[2]).split(', ');
    const companyLocationCity = companyLocation[0];
    const companyLocationCountry = companyLocation[1];
    const whenToStart = info[3];
    const typeOfContract = (info[4]).trim();
    const seniorityLevel = (info[5]).split(', ');

    console.log(companyName);
    console.log(companySize);
    console.log(companyLocation);
    console.log(companyLocationCountry);
    console.log(companyLocationCity);
    console.log(whenToStart);
    console.log(typeOfContract);
    console.log(seniorityLevel);

    await browser.close();
})();   