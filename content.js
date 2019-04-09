// TODO: double salary info is not working

const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const url = 'https://nofluffjobs.com/job/java-developer-4-years-of-experience-prodata-consult-ybkpfh9u?criteria=category%253Dbackend';
const fs = require('fs');

jobInfo = {
    position: '',
    salaryMin: 0,
    salaryMax: 0,
    salaryCurrency: ' ',
    salaryRate: 0,
    contractType: '',
    typeOfContract: '',
    seniorityLevel: [],
    whenToStart: '',
    companyName: '',
    companySize: 0,
    companyLocationCity: '',
    companyLocationCountry: '',
    requirements: [],
};

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    
    let content = await page.content();
    var $ = cheerio.load(content, {"waitUntil" : "networkidle0"});

    // get all links
    jobInfo.position = $('.posting-header-description h1').text();

    let info = []
    $('.posting-header-description dd').each(function(i, elem) {
        // console.log($(this).text());
        info[i] = $(this).text();
    });

    jobInfo.companyName = info[0];
    jobInfo.companySize = info[1];
    const companyLocation = (info[2]).split(', ');
    jobInfo.companyLocationCity = companyLocation[0];
    jobInfo.companyLocationCountry = (companyLocation[1]).trim();
    jobInfo.whenToStart = info[3];
    jobInfo.typeOfContract = (info[4]).trim();
    jobInfo.seniorityLevel = (info[5]).split(', ');

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

    const salaryInfoText = $('.posting-main-info p').text();
    // check contract type
    if(salaryInfoText.toUpperCase().includes('B2B')) {
        jobInfo.contractType = 'B2B';
    } 
    else if(salaryInfoText.toUpperCase().includes('UOP')) {
        jobInfo.contractType = 'UoP';
    }

    // check payment rate
    if(salaryInfoText.toUpperCase().includes('MONTH')) {
        jobInfo.salaryRate = 'month';
    }
    else if(salaryInfoText.toUpperCase().includes('DAY')) {
        jobInfo.salaryRate = 'day';
    }

    $('.requirement').each(function(i, elem) {
        jobInfo.requirements[i] = ($(this).text());
    });


    // const requirementsGray = $('.requirement requirement-gray').each(function(i, elem) {
    //     console.log($(this).text());
    // });


    console.log(jobInfo);

    await browser.close();
})();   