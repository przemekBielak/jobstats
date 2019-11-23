// TODO: requirements grey and green distinction
// TODO: Fully remote job option after salary view (country, city, when to start)
// TODO: Add error checks for salary. Example: Unpaid

const cheerio = require("cheerio");
const puppeteer = require("puppeteer");
const fs = require("fs");
import helpers from "./helpers";

const convertSalaryToNumber = salary => {
  let val = 0;

  // get last character
  if (salary.toLowerCase().slice(-1) == "k") {
    val = parseFloat(salary.slice(0, -1), 10) * 1000;
  } else {
    val = parseFloat(salary, 10);
  }

  return val;
};

// Returns parsed job offer website data as json object
export default async (url, category) => {
  let jobInfo = {
    _id: "",
    date: null,
    category: "",
    position: "",
    salary: [],
    seniorityLevel: [],
    city: [],
    // requirements: [],
    languages: [],
    db: [],
    mobile: [],
    webFrameworks: [],
    otherFrameworks: []
  };

  jobInfo._id = url;
  jobInfo.date = new Date();
  jobInfo.category = category;

  console.log(`Started parsing ${url}`);
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle0" });
  await page.setViewport({ width: 1680, height: 960 });
  await page.content();
  let bodyHTML = await page.evaluate(() => document.body.innerHTML);

  const $ = cheerio.load(bodyHTML);

  // job title
  jobInfo.position = $(".posting-details-description h1").text();

  // seniority
  $(".col.star-section.text-center.active p").each(function(i, elem) {
    jobInfo.seniorityLevel.push(
      $(this)
        .text()
        .toLowerCase()
    );
  });

  // check salary info
  let salaryMin = [];
  let salaryMax = [];
  let salaryCurrency = [];
  $("nfj-posting-salaries div h4").each(function(i, item) {
    let salary = $(this)
      .text()
      .split(" ")
      .filter(Boolean);

    // Unpaid category
    if (salary == "Unpaid") {
      salaryMin[i] = "0";
      salaryMax[i] = "0";
      salaryCurrency[i] = "";
    }
    // check if minus sign is in text. It signalizes salary range, not a fixed value.
    else if (salary.indexOf("-") >= 0) {
      salaryMin[i] = salary[0];
      salaryMax[i] = salary[2];
      salaryCurrency[i] = salary[3].toLowerCase();
    } else {
      salaryMin[i] = salary[0];
      salaryMax[i] = salary[0];
      salaryCurrency[i] = salary[1].toLowerCase();
    }
  });

  let contractType = [];
  let salaryRate = [];
  $("nfj-posting-salaries div p").each(function(i, item) {
    // check contract type
    let salaryInfoText = $(this).text();
    if (salaryInfoText.toUpperCase().includes("B2B")) {
      contractType[i] = "b2b";
    } else if (salaryInfoText.toUpperCase().includes("UOP")) {
      contractType[i] = "uop";
    } else if (salaryInfoText.toUpperCase().includes("EMPLOYMENT")) {
      contractType[i] = "uop";
    } else if (salaryInfoText.toUpperCase().includes("UZ")) {
      contractType[i] = "uz";
    } else if (salaryInfoText.toUpperCase().includes("MANDATE")) {
      contractType[i] = "uz";
    } else if (salaryInfoText.toUpperCase().includes("UOD")) {
      contractType[i] = "uod";
    } else {
      contractType[i] = "";
    }

    // check payment rate
    if (salaryInfoText.toUpperCase().includes("MONTH")) {
      salaryRate[i] = "month";
    } else if (salaryInfoText.toUpperCase().includes("DAY")) {
      salaryRate[i] = "day";
    } else if (salaryInfoText.toUpperCase().includes("HOUR")) {
      salaryRate[i] = "hour";
    } else if (salaryInfoText.toUpperCase().includes("YEAR")) {
      salaryRate[i] = "year";
    } else {
      salaryRate[i] = "";
    }
  });

  let companyLocation = [];
  $(".d-flex.align-items-center.w-100 .text-truncate").each(function(i, elem) {
    companyLocation.push(
      $(this)
        .text()
        .toLowerCase()
        .trim()
        .split(", ")[0]
    );
  });

  jobInfo.city = helpers.updateCity(companyLocation);

  jobInfo.salary = [];
  // save all salary related data in one array of objects
  for (let i = 0; i < salaryMin.length; i++) {
    jobInfo.salary[i] = {};

    console.log(salaryRate[i])

    if (salaryRate[i] == "month") {
      jobInfo.salary[i]["salaryMin"] = convertSalaryToNumber(salaryMin[i]);
      jobInfo.salary[i]["salaryMax"] = convertSalaryToNumber(salaryMax[i]);
    } else if (salaryRate[i] == "day") {
      jobInfo.salary[i]["salaryMin"] = convertSalaryToNumber(salaryMin[i]) * 20;
      jobInfo.salary[i]["salaryMax"] = convertSalaryToNumber(salaryMax[i]) * 20;
    } else if (salaryRate[i] == "hour") {
      jobInfo.salary[i]["salaryMin"] =
        convertSalaryToNumber(salaryMin[i]) * 160;
      jobInfo.salary[i]["salaryMax"] =
        convertSalaryToNumber(salaryMax[i]) * 160;
    } else if (salaryRate[i] == "year") {
      jobInfo.salary[i]["salaryMin"] =
        convertSalaryToNumber(salaryMin[i]) / 12;
      jobInfo.salary[i]["salaryMax"] =
        convertSalaryToNumber(salaryMax[i]) / 12;
    } else {
    }
    jobInfo.salary[i]["salaryCurrency"] = salaryCurrency[i];
    jobInfo.salary[i]["contractType"] = contractType[i];
  }

  // requirements
  let requirements = [];
  $(".d-block .btn.btn-sm.btn-outline-success.text-truncate").each(function(
    i,
    elem
  ) {
    requirements.push(
      $(this)
        .text()
        .toLowerCase()
        .replace("\n", "")
        .trim()
    );
  });
  requirements.sort();

  jobInfo.languages = helpers.updateLanguages(requirements);
  jobInfo.db = helpers.updateDb(requirements);
  jobInfo.mobile = helpers.updateMobile(requirements);
  jobInfo.webFrameworks = helpers.updateWebFrameworks(requirements);
  jobInfo.otherFrameworks = helpers.updateOtherFrameworks(requirements);

  console.log(jobInfo);
  console.log(requirements);

  await browser.close();

  return jobInfo;
};
