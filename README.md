## About
A simple backend JSON REST API which fetches data from another REST API  
For every tag specified in the tags parameter, fetch the posts with that tag using the Hatchways API (make a separate API request for every tag specified)  
  
Combine all the results from the API requests above and remove all the repeated posts  

### Route 1
Route: /api/ping  
Method: GET  
Response body (JSON):  
  
    {  
      "success": true  
    }  
Response status code: 200

### Route 2
Route: /api/posts  
Method: GET  
Query Parameters:  
tags: String (required) A comma separated list of tags <science, tech>  
sortBy: String (optional) The field to sort the posts by <id, reads, likes, direction>  
direction: String (optional) The sort direction <asc, desc>  
Response body (JSON):  
  
    {
        "posts": [{
        "id": 1,
        "author": "Rylee Paul",
        "authorId": 9,
        "likes": 960,
        "popularity": 0.13,
        "reads": 50361,
        "tags": [ "tech", "health" ]
        },
        ...
      ]
    }
Response status code: 200
  

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

