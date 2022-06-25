const axios = require('axios');
const ExternalDataProvider = require('../ExternalDataProvider').ExternalDataProvider;
var externalDataProvider = new ExternalDataProvider();

//  .../api/posts
exports.posts = async (req, res) => {
    let err = "";
    let axiosArray = [];

    try {
        //Get tags from query params and create a array of external HTTP requests to make.
        if (!req.query.tags) {
            throw err = "Tags param is required!";
        }

        //  Add every tag from query param to [tags] array
        let tags = req.query.tags.split(',');

        //  For every tag, create a new Promise with axios
        for (let i = 0; i < tags.length; i++) {
            let newPromise = axios({
                method: 'get',
                url: `${process.env.EXTERNAL_URL}${tags[i]}`
            });
            
            //  Add all Promises to [axiosArray]
            axiosArray.push(newPromise);
        }
    } catch (err) {
        res.status(400).json(err);
    }

    //send all requests and get data from exernal api
    externalDataProvider.get(axiosArray, function (data) {
        try {
            if (!Array.isArray(data)) {
                throw data;
            }

            //prepare sortBy
            let sortBy = 'id';   //default sort

            if (req.query.sortBy) {
                sortBy = req.query.sortBy.toLowerCase();
            }

            //validate sortBy param
            if (!['id', 'reads', 'likes', 'popularity'].includes(sortBy)) {
                throw ("sortBy parameter is invalid!");
            }

            //prepare direction
            let direction = 'asc';  //default direction

            if (req.query.direction)
                direction = req.query.direction.toLowerCase();

            //validate direction
            if (!['asc', 'desc'].includes(direction)) {
                throw ("direction parameter is invalid!");
            }

            //sort data
            externalDataProvider.sort(data, sortBy, direction, function (sortedData) {
                if (Array.isArray(sortedData)) {
                    res.status(200).json({ "posts": sortedData });
                }
                else
                    throw sortedData;
            });
        } catch (err) {
            res.status(400).json({ "error": err });
        }
    });
}