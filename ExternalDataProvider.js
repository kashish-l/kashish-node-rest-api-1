const axios = require('axios');

ExternalDataProvider = function () {

  this.get = function (axiosArray, cb) {
    //Send all requests in the array and fetch data from Hatchways API
    //Remove duplicates and pass data to callback function
    axios.all(axiosArray)
      .then(axios.spread((...responses) => {
        let posts = [];
        responses.forEach(res => {
          posts.push(...res.data.posts);
        });

        //Remove Duplicates
        const map = new Map();
        posts.forEach((post) => map.set(JSON.stringify(post), post));
        posts = [...map.values()];

        //pass data to callback function
        cb(posts);

      })).catch(error => { cb(error.toString()) });
  }

  this.sort = function (data, sortBy, direction, cb) {
    try {      
      if (data.length > 1) {
        //sort data
        data.sort((a, b) => { return parseFloat(a[sortBy]) - parseFloat(b[sortBy]) });
        //direction
        if (direction === 'desc')
          data.reverse();
      }
      cb(data);
    } catch (error) {
        cb(error.toString());
    }
  }

};

exports.ExternalDataProvider = ExternalDataProvider;