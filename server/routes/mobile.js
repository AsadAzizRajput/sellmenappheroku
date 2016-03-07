var express = require('express');
var Firebase = require('firebase');
//var ref = new Firebase("https://sellmenapp.firebaseio.com/users");
var dbFunction_1 = require("../dbFunctions/dbFunction");
var router = express.Router();
router.post("", function (req, res) {
    console.log(req.body.data);
});

router.post("/mobilLogin", function (req, res) {
    console.log("On Login In");
    console.log(req.body);
    //console.log("asa");
    //var user = req.body;
    dbFunction_1.findUserSellmen({ Email: req.body.data.email })
        .then(function (userInstance) {
            //adminName = userInstance.a;
            //console.log("sdasdas0" + adminName);
            if (!userInstance) {
                res.send("No user found with supplied email");
                return;
            }
            if (userInstance.Password == req.body.data.password) {
                res.send({ message: "Logged In successfully", token: userInstance.FirebaseToken,AdminId: userInstance.AdminId,Email:userInstance.Email});
                console.log(userInstance);
            }
            else {
                res.send("Wrong Password");
            }
        }, function (err) {
            res.send({ status: false, message: err });
        });
});




router.post("/placeorder", function (req, res) {

            dbFunction_1.placeOrder(req.body.data)
                .then(function (orders) {
                    res.send({ status: true, orders: orders });
                }, function (err) {
                    res.send({ status: false, message: err });
                });

});

module.exports = router;

