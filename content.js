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
    requirementsTechnical: [],
    requirementsOther: [],
    requirementsNices: [],
};

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    
    let content = await page.content();
    var $ = cheerio.load(content, {"waitUntil" : "networkidle0"});

    // check job position
    jobInfo.position = $('.posting-header-description h1').text();

    let info = []
    $('.posting-header-description dd').each(function(i, elem) {
        // console.log($(this).text());
        info[i] = $(this).text();
    });

    // check basic info
    jobInfo.companyName = info[0];
    jobInfo.companySize = info[1];
    const companyLocation = (info[2]).split(', ');
    jobInfo.companyLocationCity = companyLocation[0];
    jobInfo.companyLocationCountry = (companyLocation[1]).trim();
    jobInfo.whenToStart = info[3];
    jobInfo.typeOfContract = (info[4]).trim();
    jobInfo.seniorityLevel = (info[5]).split(', ');

    // check salary info
    const salary = $('.posting-main-info h4').text().split(' ');
    // remove - sign from array
    for(let i = 0; i < salary.length; i++) {
        if(salary[i] === '-') {
            salary.splice(i, 1);
        }
    }
    jobInfo.salaryMin = salary[0];
    jobInfo.salaryMax = salary[1];
    jobInfo.salaryCurrency = salary[2];

    // check contract type
    const salaryInfoText = $('.posting-main-info p').text();
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

    // All Technical requirements
    $('.requirement.ng-binding.ng-scope').each(function(i, elem) {
        jobInfo.requirementsTechnical[i] = $(this).text();
    });

    // Other requirements
    $('.requirement.ng-binding.ng-scope.requirement-gray').each(function(i, elem) {
        jobInfo.requirementsOther[i] = $(this).text();
    });

    // Nices requirements
    $("[ng-repeat='tech in formData.requirements.nices']").each(function(i, elem) {
        // console.log(item);
        jobInfo.requirementsNices[i] = $(this).text();
    })

    // Check if other requirements are also in technical requirements. If yes, then delete
    for(let i = 0; i < jobInfo.requirementsOther.length; i++) {
        if(jobInfo.requirementsTechnical.includes(jobInfo.requirementsOther[i])) {
            index = jobInfo.requirementsTechnical.indexOf(jobInfo.requirementsOther[i]);
            jobInfo.requirementsTechnical.splice(index, 1);
        }
        if(jobInfo.requirementsTechnical.includes(jobInfo.requirementsNices[i])) {
            index = jobInfo.requirementsTechnical.indexOf(jobInfo.requirementsNices[i]);
            jobInfo.requirementsTechnical.splice(index, 1);
        }
    }


    console.log(jobInfo);

    await browser.close();
})();   