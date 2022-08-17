const express = require('express');
let port = 3777;

const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const fs = require("fs");
const { join } = require('path');

const app = express();

app.use(require('express-domain-middleware'));
app.use(function errorHandler(err, req, res, next) {
    console.log('error on request %d %s %s: %j', process.domain.id, req.method, req.url, err);
    res.send(500, "Something bad happened. :(");
});

const corsOptions = {
    origin: '*',
    methods: ['POST', 'GET', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookieParser());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'https://anify.club');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.get('/', function(req, res){
    res.sendFile("index.html", { root: join(__dirname, './') });
});

app.get('/index.html', function(req, res){
    res.sendFile("index.html", { root: join(__dirname, './') });
});

app.get('/index.css', function(req, res){
    res.sendFile("index.css", { root: join(__dirname, './') });
});

app.get('/cinematic.mp4', function(req, res){
    res.sendFile("cinematic.mp4", { root: join(__dirname, './') });
});

app.get('/logo.png', function(req, res){
    res.sendFile("logo.png", { root: join(__dirname, './') });
});

app.get('/logo.ico', function(req, res){
    res.sendFile("logo.ico", { root: join(__dirname, './') });
});

app.listen(port, () => {
    console.log('Listening to port ' + port);
})

// For nginx, use start nginx to start the server.
// To stop it, get the pid of the process and kill it.
// tasklist /fi "imagename eq nginx.exe"
// Get the pid ^
// taskkill /f /pid *pid of nginx.exe*
// Kill the process ^