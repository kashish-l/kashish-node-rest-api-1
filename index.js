require('dotenv').config();
const express = require("express");
const app = express();
 

//import routes
const postRoute = require('./routes/post.routes');
app.use('/api', postRoute);


//Server
app.listen(process.env.PORT, () => {
    console.log("Server running on port 3000");
});
