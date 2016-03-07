//</// <reference path="typings/tsd.d.ts" />
var dbFunction1 = require('./dbFunctions/dbFunction');
var GeneralRoutes = require("./routes/web");
var GeneralRoutesMobile = require("./routes/mobile");
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors =require('cors');
var app = express();
//app.set('port', 9000);
app.set('port', (process.env.PORT || 3000));
app.use(cors());
var staticPath = path.resolve(__dirname, "static");
app.use(express.static(staticPath));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


//app.use(function(req, res, next) {
//	res.header("Access-Control-Allow-Origin", "*");
//	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//	next();
//});

//app.get('/', function(req, res, next) {
//	// Handle the get for this route
//});
//
//app.post('/', function(req, res, next) {
//	// Handle the post for this route
//});
app.use(function (req, res, next) {
    //next();
	if (req.query.token) {
		dbFunction1.findUser({ FirebaseToken: req.query.token })
			.then(function (dbUser) {
				if (dbUser) {
					req.user = dbUser;
					next();
				}
			}, function (err) {
				next(err);
			});
	}
	else {
        next();
    }
});
// app.all('*', function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     next();
// });

app.use("/api", GeneralRoutes);
app.use("/mobileApi", GeneralRoutesMobile);

app.get("*", function (req, res) {
    var indexViewPath = path.resolve(__dirname, "./static/adminPortal/index.html");
    res.sendFile(indexViewPath);
});
app.listen(app.get('port'), function () {
    console.log("Server is on port ", app.get('port'));
});
console.log("Mongo connection");
//mongoose.connect("mongodb://localhost/usersdata");
//mongoose.connect("mongodb://localhost/usersdata");
//sellmenapp user name
//1234 password
// ghalat haimongoose.connect("mongodb://Sellmen:123@ds011268.mongolab.com:11268/usersdata")
mongoose.connect("mongodb://sellmenapp:1234@ds011308.mongolab.com:11308/sellmen")