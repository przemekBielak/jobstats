## Webcrawler 

## Description  
Puppeteer webcrawler downloads data from all job postings and saved them to MongoDB database.  
Webcrawler is scheduled to run daily, so all website information is up to date.


## Example MongoDB job posting document
```json
{
    "_id" : "https://nofluffjobs.com/job/junior-javascript-developer-reed-qff0t3wz?criteria=category%253Dfrontend",
    "date" : ISODate("2019-05-01T11:23:26.104Z"),
    "category" : "frontend",
    "position" : "Junior JavaScript Developer",
    "salary" : [ 
        {
            "salaryMin" : 5000,
            "salaryMax" : 8000,
            "salaryCurrency" : "PLN",
            "contractType" : "B2B",
            "salaryRate" : "month"
        }
    ],
    "typeOfContract" : "Permanent contract",
    "seniorityLevel" : [ 
        "Junior"
    ],
    "whenToStart" : "ASAP",
    "companyName" : "REED",
    "companySize" : "1-9 people",
    "companyLocationCity" : "wrocław",
    "companyLocationCountry" : "Poland",
    "requirementsMustHave" : [ 
        "JavaScript", 
        "Angular", 
        "CSS", 
        "HTML"
    ],
    "requirementsNices" : [ 
        "Communication skills", 
        "Critical thinking", 
        "Problem solving", 
        "Proactivity", 
        "GraphQL", 
        "JEST", 
        "Unit tests", 
        "E2E testing with Cypress", 
        "Node", 
        "English", 
        "Communication skills", 
        "Sass", 
        "min 1-year experience in Java", 
        "min 26 hours/week", 
        "English", 
        "Problem solving", 
        "min 80% of the work time in the office (max 20% remote)", 
        "no spoken english required :)"
    ],
    "workMethodology" : {
        "QA manager" : [ 
            "Yes"
        ],
        "Unit tests" : [ 
            "Yes"
        ],
        "Agile management" : [ 
            "Yes"
        ],
        "Issue tracking tool" : [ 
            "Jira"
        ],
        "Knowledge repository" : [ 
            "Yes"
        ],
        "Code reviews" : [ 
            "Yes"
        ],
        "Pair programming" : [ 
            "Yes"
        ],
        "Build server" : [ 
            "Yes"
        ],
        "Tester(s)" : [ 
            "1 person"
        ],
        "Version control system" : [ 
            "GIT"
        ],
        "Integration tests" : [ 
            "Yes"
        ],
        "Static code analysis" : [ 
            "Sonar"
        ],
        "Commit on the first day" : [ 
            "Yes"
        ],
        "One command build possible" : [ 
            "Yes"
        ],
        "Up and running within 2h" : [ 
            "Yes"
        ]
    },
    "os" : {
        "mac" : false,
        "windows" : true,
        "linux" : true
    },
    "computer" : "",
    "monitors" : "",
    "specs" : {
        "Job profile" : "Mainly new features",
        "Paid holiday" : "Yes",
        "Part time work" : "No",
        "Remote possible" : "Yes (2 days a week)",
        "Flexible hours" : "Yes",
        "Travel involved" : "No",
        "Freedom to choose tools" : "No",
        "Relocation package" : "Yes",
        "Client support" : "Yes",
        "Meetings" : "Yes",
        "Fulltime job" : "Yes",
        "Remote job" : "100%",
        "Maintenance / Bug fixing" : "20%",
        "Students are welcome" : "",
        "Part-time job possible" : ""
    },
    "perks" : [ 
        "Free coffee", 
        "Canteen", 
        "Startup atmosphere", 
        "Shower", 
        "Free snacks", 
        "Free beverages", 
        "Mobile phone", 
        "Free parking", 
        "In-house trainings", 
        "In-house hack days", 
        "Modern office", 
        "No dress code", 
        "Free breakfast"
    ],
    "benefits" : [ 
        "International projects", 
        "In-house trainings", 
        "Conference budget", 
        "Team Events", 
        "Private health care", 
        "In-house trainings", 
        "Conference budget", 
        "Team Events", 
        "Private health care", 
        "Recurring team events", 
        "Accounting costs refund for B2B contractors", 
        "Flexible working hours and remote work possibilities", 
        "Recurring team events", 
        "Annual Assessment", 
        "Possibility to change projects", 
        "Exposure to Business Stakeholders", 
        "Innovative Projects"
    ]
}
```


## Installation
Start webcrawler:  
```bash
npm run start
```


## License
MIT © [Przemysław Bielak]()