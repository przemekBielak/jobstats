## Jobs statistics

## Description  
Website provides daily updated information about developer job market.  
Website is made out of two applications:  
- Backend webcrawler to get job information from job posting websites. Data is saved in MongoDB database. 
- React frontend application to visualize the data.

## Website link
[jobs.bielak.me](https://jobs.bielak.me/)  
 
## Screenshots
![Website Screenshot](https://i.imgur.com/blH4jS4.png)

## Tech/frameworks used

<b>Frontend</b>
- React
- Victory

<b>Backend</b>
- MongoDB
- Express.js
- Puppeteer

<b>Deployment</b>
- Nginx
- PM2

## Features
<b>Frontend</b>  
Using selects in headerbar, user can specify job details. Post request is send to backend server and returns corresponding data.  
Website updates all charts based on received data.
Website supports mobile and desktop layouts.  

<b>Backend</b>  
Puppeteer webcrawler is parsing jobs posting websites daily and gets all of the job offers. They are saved in MongoDB database. Data is used by the frontend application.

<b>Deployment</b>  
Website is hosted by Express.js server on a private server.  
Nginx is used as a reversed proxy to the website.  
Express script is scheduled to run by PM2 on a server start.  
SSL certificate was granted using LetsEncrypt.  
All non-SSL requests are routed to SSL website.  


## Installation
Deployment build: 
```bash
cd app
npm run build  
```

Start React app: 
```bash
cd app
npm run start
```  

Start webcrawler:  
```bash
cd db
npm run start
```


## License
MIT © [Przemysław Bielak]()