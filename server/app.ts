//</// <reference path="typings/tsd.d.ts" />
let dbFunction1 = require('./dbFunctions/dbFunction');
let GeneralRoutes = require("./routes/web");
import express = require('express');
import path = require('path');
// import bodyParser = require('body-parser');
 import mongoose = require('mongoose');

let app  = express();
app.set('port', (process.env.PORT));

var staticPath = path.resolve(__dirname, "static");
app.use(express.static(staticPath));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

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
let b;
// app.all('*', function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     next();
// });

app.use("/api", GeneralRoutes);
app.get("*", function (req, res) {
    var indexViewPath = path.resolve(__dirname, "./static/adminPortal/index.html");
    res.sendFile(indexViewPath);
});
app.listen(app.get('port'), function () {
    console.log("Server is on port ", app.get('port'));
});
//mongoose.connect("mongodb://localhost/usersdata");
//sellmenapp user name
//1234 password
// ghalat haimongoose.connect("mongodb://Sellmen:123@ds011268.mongolab.com:11268/usersdata")
mongoose.connect("mongodb://sellmenapp:1234@ds011308.mongolab.com:11308/sellmen")