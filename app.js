const express = require('express');
const controller = require('./authController')
const bodyParser = require("body-parser");

const urlencodedParser = bodyParser.urlencoded({extended: false})

const PORT = 2000;
const app = express();
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Credentials: true');
    res.header("Access-Control-Allow-Methods: GET, POST");
    next();
});

app.post('/search', urlencodedParser, controller.search)


app.listen(PORT, () => console.log('Server started on port ', PORT))
