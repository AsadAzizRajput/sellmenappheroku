var express = require('express');
var Firebase = require('firebase');
var ref = new Firebase("https://sellmenapp.firebaseio.com/order");
var dbFunction_1 = require("../dbFunctions/dbFunction");

var router = express.Router();
//var adminName;
router.post("/signup", function (req, res) {
    ref.createUser({
        email: req.body.data.Email,
        password: req.body.data.Password
    }, function (err, success) {
        if (err) {
            res.send(err);
        }
        else {
            console.log(req.body);
            req.body.data.FirebaseToken = success.uid;
            dbFunction_1.saveAdminUser(req.body.data)
                .then(function (userInstance) {
                res.send({ status: true, user: userInstance });
            }, function (err) {
                res.send({ status: false, message: err });
            });
        }
    });
});
router.post("/login", function (req, res) {
    console.log("On Login In");
    //console.log(req.body);
    //console.log("asa");
    //var user = req.body;
    dbFunction_1.findUser({ Email: req.body.data.email })
        .then(function (userInstance) {
        //adminName = userInstance.a;
        //console.log("sdasdas0" + adminName);
        if (!userInstance) {
            res.send("No user found with supplied email");
            return;
        }
        if (userInstance.Password == req.body.data.password) {
            res.send({ message: "Logged In successfully", token: userInstance.FirebaseToken, });
            console.log(userInstance);
        }
        else {
            res.send("Wrong Password");
        }
    }, function (err) {
        res.send({ status: false, message: err });
    });
});
router.post("/addsellmen", function (req, res) {
    ref.createUser({
        email: req.body.data.Email,
        password: req.body.data.Password
    }, function (err, success) {
        if (err) {
            res.send(err);
        }
        else {
            console.log(req.body);
            req.body.data.FirebaseToken = success.uid;
            //let token = req.body.token;
            //console.log(token);
            //let token = localStorage.getItem("token");
            //req.body.data.AdminId = token; 
            //console.log(req.body.data.a + "fdfd");
           dbFunction_1.saveSellsmen(req.body.data)
                .then(function (userInstance) {
                res.send({ status: true, user: userInstance });
            }, function (err) {
                res.send({ status: false, message: err });
            });
        }
    });
});
router.get("/getsalesmen", function (req, res) {
    console.log("in get ses men");
   // console.log(req.user.FirebaseToken);
    var adminUid=req.user.FirebaseToken;
    var orders;
    // Get a database reference to our posts
    //var ref = new Firebase("https://docs-examples.firebaseio.com/web/saving-data/fireblog/posts");
// Attach an asynchronous callback to read the data at our posts reference
    ref.on("value", function(snapshot) {
        //console.log(snapshot.val());
        var orders=snapshot.val();
        console.log("with snapshot");
        console.log(orders);
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });



    
     dbFunction_1.getSalesmen({ AdminId: adminUid })
        .then(function (userInstance) {
        console.log("in get sellmen"+userInstance);
        res.send({ userAll: userInstance,orders:"asad" });
    });
    
  
   
});
module.exports = router;

/*

 dbFunction_1.findUser({ Email: req.body.data.email })
        .then(function (userInstance) {
        if (!userInstance) {
            res.send("No user found with supplied email");
            return;
        }
        if (userInstance.Password == req.body.data.password) {
            res.send({ message: "Logged In successfully", token: userInstance.FirebaseToken, });
            console.log("Hi....." + userInstance);
        }
        else {
            res.send("Wrong Password");
        }
    }, function (err) {
        res.send({ status: false, message: err });
    }); 
       

*/