## About
A simple backend JSON REST API which fetches data from another REST API  
For every tag specified in the tags parameter, fetch the posts with that tag using the Hatchways API (make a separate API request for every tag specified)  
  
Combine all the results from the API requests above and remove all the repeated posts  

## Installation
npm install  

Create a .env file and add  
PORT=3000  
EXTERNAL_URL= Hatchways API URL  

## Run
npm start  

## Technologies
Node.js  
express.js  
axios  
router  
dotenv  

## Routes
/api/ping  
/api/posts/:tags/:sortBy?/:direction?  

