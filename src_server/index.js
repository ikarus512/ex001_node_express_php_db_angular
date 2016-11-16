var express         = require('express');
var app             = express();
var app_http        = express();
var bodyParser      = require('body-parser');
var upload          = require('multer')();
var session         = require('express-session');
var cookieParser    = require('cookie-parser');
var path            = require('path');
var fs              = require('fs');
var http            = require('http');
var https           = require('https');
var routes_https    = require('./routes/https.js'); 

var https_options = {
    key  : fs.readFileSync(__dirname+'/cert/server.key'),
    cert : fs.readFileSync(__dirname+'/cert/server.crt')
};

app.set('view engine', 'pug');
app.set('views',__dirname+'/views');
//app.configure('development', function () { app.locals.pretty = true; });
app.locals.pretty = true;

app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json());

app.use(upload.array());
app.use(cookieParser());
app.use(session({secret: "Your secret key765", resave: false, saveUninitialized: true}));
app.use(express.static(path.join(__dirname, '../public')));

app.use('/', routes_https);



https.createServer(https_options, app).listen(443, function () {
    console.log('Started https.');
});




// Automatic redirect all HTTP traffic to HTTPS home page
app_http.all('*', function(req, res, next){
    res.redirect('https://'+req.hostname); // Works only for default https port 443
});
http.createServer(app_http).listen(80, function () {
    console.log('Started http!');
});
