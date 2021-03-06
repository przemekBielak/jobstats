const cheerio = require("cheerio");
const puppeteer = require("puppeteer");
const MongoClient = require("mongodb").MongoClient;
import jobParser from "./content";

const mongoUrl = "mongodb://localhost:27017/";
const mongoOptions = { useNewUrlParser: true };
const dbname = "jobs";
const dbcollection = "jobs";

const url = "https://nofluffjobs.com/";
const category = [
  "backend",
  "fullstack",
  "mobile",
  "frontend",
  "testing",
  "devops",
  "hr",
  "trainee",
  "ux",
  "support",
  "project-manager",
  "business-analyst",
  "other"
];

let jobLinks = [];


async function sleep(time) {
  return await new Promise((resolve, reject) => {
    if (isNaN(time)) {
      reject(new Error("timeout requires a valid number"));
    }
    setTimeout(resolve, time);
  });
}

(async () => {
  const dbclient = await MongoClient.connect(mongoUrl, mongoOptions);
  const db = dbclient.db(dbname);
  console.log("Connected to database");

  for (let iter = 0; iter < category.length; iter++) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url + category[iter]);
    await page.waitFor(3000);
    const $ = cheerio.load(await page.content());

    // get all links
    let links = $(".col-sm-12 .list-item ");
    for (let i = 0; i < links.length; i++) {
      jobLinks.push("https://nofluffjobs.com" + links[i].attribs.href);
    }

    console.log(`--> Got ${jobLinks.length} links from ${category[iter]}`);
    await browser.close();

    if (jobLinks.length != 0) {
      for (let i = 0; i < jobLinks.length; i++) {
        const timeCounter = Math.floor(Math.random() * 30000 + 2000);

        // check if link exists in db
        const exists = await db
          .collection(dbcollection)
          .countDocuments({ _id: jobLinks[i] });
        if (!exists) {
          // save parsed data to db
          const newDoc = await jobParser(jobLinks[i], category[iter]);
          db.collection(dbcollection).insertOne(newDoc);
          console.log("Saved " + jobLinks[i] + " to db");

          // add new must have requirements to requirementsMustHaveAll list in db
          const mustDoc = await db
            .collection(dbcollection)
            .findOne({ _id: "requirementsMustHaveAll" });
          newDoc.requirementsMustHave.forEach(x => {
            if (!mustDoc.requirementsMustHaveAll.includes(x)) {
              mustDoc.requirementsMustHaveAll.push(x);
            }
          });
          await db.collection(dbcollection).updateOne(
            { _id: "requirementsMustHaveAll" },
            {
              $set: {
                requirementsMustHaveAll: mustDoc.requirementsMustHaveAll
              }
            }
          );

          // add new cities to citiesAll list in db
          const citiesDoc = await db
            .collection(dbcollection)
            .findOne({ _id: "citiesAll" });
          if (!citiesDoc.citiesAll.includes(newDoc.companyLocationCity)) {
            citiesDoc.citiesAll.push(newDoc.companyLocationCity);
          }
          await db
            .collection(dbcollection)
            .updateOne(
              { _id: "citiesAll" },
              { $set: { citiesAll: citiesDoc.citiesAll } }
            );

          // wait before next parsing
          console.log(`Waiting for ${timeCounter / 1000} seconds`);
          await sleep(timeCounter);
        } else {
          console.log(jobLinks[i] + " already exists in db");
        }
      }
    } else {
      console.log("Error while getting links");
    }

    // Clear links array for another category
    jobLinks = [];
  }

  await dbclient.close();
})();
