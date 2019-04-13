// TODO: requirements grey and green distinction

const cheerio = require('cheerio');
const puppeteer = require('puppeteer');

var jobInfo = {
    position: '',
    salary: [],
    typeOfContract: '',
    seniorityLevel: [],
    whenToStart: '',
    companyName: '',
    companySize: '',
    companyLocationCity: '',
    companyLocationCountry: '',
    requirementsMustHave: [],
    requirementsNices: [],
    workMethodology: [],
    os: [],
    computer: '',
    monitors: '',
    specs: [],
    perks: [],
    benefits: [],
};

// Returns parsed job offer website data as json object
export default async (url) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    
    let content = await page.content();
    var $ = cheerio.load(content, {"waitUntil" : "networkidle0"});

    // console.log(content);

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
    let salaryMin = [];
    let salaryMax = [];
    let salaryCurrency = [];
    $('.posting-main-info h4').each(function(i, item) {
        let salary = $(this).text().split(' ');
        // remove - sign from array
        for(let i = 0; i < salary.length; i++) {
            if(salary[i] === '-') {
                salary.splice(i, 1);
            }
        }
        salaryMin[i] = salary[0];
        salaryMax[i] = salary[1];
        salaryCurrency[i] = salary[2];
    })
    
    let contractType = [];
    let salaryRate = [];
    $('.posting-main-info p').each(function(i, item) {
        
        // check contract type
        let salaryInfoText = $(this).text();
        if(salaryInfoText.toUpperCase().includes('B2B')) {
            contractType[i] = 'B2B';
        } 
        else if(salaryInfoText.toUpperCase().includes('UOP')) {
            contractType[i] = 'UoP';
        }

        // check payment rate
        if(salaryInfoText.toUpperCase().includes('MONTH')) {
            salaryRate[i] = 'month';
        }
        else if(salaryInfoText.toUpperCase().includes('DAY')) {
            salaryRate[i] = 'day';
        }
        else if(salaryInfoText.toUpperCase().includes('HOUR')) {
            salaryRate[i] = 'hour';
        }
    })

    // save all salary related data in one array of objects
    for(let i = 0; i < salaryMin.length; i++) {
        jobInfo.salary[i] = []
        jobInfo.salary[i]['salaryMin'] = salaryMin[i];
        jobInfo.salary[i]['salaryMax'] = salaryMax[i];
        jobInfo.salary[i]['salaryCurrency'] = salaryCurrency[i];
        jobInfo.salary[i]['contractType'] = contractType[i];
        jobInfo.salary[i]['salaryRate'] = salaryRate[i];
    }


    // All requirements
    $('.requirement.ng-binding.ng-scope').each(function(i, elem) {
        jobInfo.requirementsMustHave[i] = $(this).text();
    });

    // Nices requirements
    $("[ng-repeat='tech in formData.requirements.nices']").each(function(i, elem) {
        // console.log(item);
        jobInfo.requirementsNices[i] = $(this).text();
    })

    // Check if nices requirements are also in must have requirements. If yes, then delete.
    for(let i = 0; i < jobInfo.requirementsNices.length; i++) {
        if(jobInfo.requirementsMustHave.includes(jobInfo.requirementsNices[i])) {
            let index = jobInfo.requirementsMustHave.indexOf(jobInfo.requirementsNices[i]);
            jobInfo.requirementsMustHave.splice(index, 1);
        }
    }

    // get all methodolody keys
    var workMethodologyKey = [];
    $("[ng-repeat='tool in tools'] .col-sm-6.p-label-row.ng-binding").each(function(i, elem) {
        let key = $(this).text().replace(/\n/g, '');
        workMethodologyKey[i] = key;
    })

    // get all methodology vals
    var workMethodologyVal = [];
    $("[ng-repeat='tool in tools'] .col-sm-6.p-value-row dd").each(function(i, elem) {
        workMethodologyVal[i] = $(this).text();
    })

    // combine keys and vals as an object
    workMethodologyKey.forEach((key, i) => jobInfo.workMethodology[key] = workMethodologyVal[i]);

    // OS - mac
    if ($("[ng-if='vm.isActiveSection('benefits.equipment')'] icon#apple.icon-blue.active").length) {
        jobInfo.os['mac'] = true;
    }else {
        jobInfo.os['mac'] = false;
    }

    // OS - windows
    if ($("[ng-if='vm.isActiveSection('benefits.equipment')'] icon#windows.icon-blue.active").length) {
        jobInfo.os['windows'] = true;
    }else {
        jobInfo.os['windows'] = false;
    }

    // OS - linux
    if ($("[ng-if='vm.isActiveSection('benefits.equipment')'] icon#linux.icon-blue.active").length) {
        jobInfo.os['linux'] = true;
    }else {
        jobInfo.os['linux'] = false;
    }
    
    // Get Computer 
    jobInfo.computer = $("[once-if='formData.benefits.equipment.computer !== '''] [tooltip-enable='formData.benefits.equipment.computer.length > 39']").text();

    // Get Monitors 
    jobInfo.monitors = $("[once-if='formData.benefits.equipment.monitors !== '''] [tooltip-enable='formData.benefits.equipment.monitors.length > 39']").text();

    // Get specs keys
    var SpecsKeys = [];
    $("[id='specs-block'] .col-sm-6.p-label-row").each(function(i, item) {
        SpecsKeys[i] = ($(this).text());
    });

    // Get specs vals
    var SpecsVals = [];
    $("[id='specs-block'] .col-sm-6.p-value-row").each(function(i, item) {
        SpecsVals[i] = ($(this).text()).trim();
    });

    // Combine specs keys and vals
    SpecsKeys.forEach((key, i) => jobInfo.specs[key] = SpecsVals[i]);

    // Perks
    $(".panel.border-top.this-and-that.ng-isolate-scope.border-top4 dd.ng-binding").each(function(i, item) {
        jobInfo.perks[i] = $(this).text();
    })

    // Benefits
    $("[ng-if='vm.isActiveSection('benefits.benefits')'] dd.ng-binding").each(function(i, item) {
        jobInfo.benefits[i] = $(this).text();
    })


    await browser.close();

    return jobInfo;
}