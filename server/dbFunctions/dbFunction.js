var mongoose = require('mongoose');
var q = require('q');
var Schema = mongoose.Schema;
var DatabaseSchema = new Schema({
    FirstName: String,
    LastName: String,
    Email: { type: String, unique: true, required: true },
    Password: String,
    CreatedOn: { type: Date, default: Date.now() },
    FirebaseToken: String
});
var DatabaseSchemaSellmen = new Schema({
    FirstName: String,
    LastName: String,
    Email: { type: String, unique: true, required: true },
    Password: String,
    CreatedOn: { type: Date, default: Date.now() },
    FirebaseToken: String,
    AdminId: String
});

var DatabaseSchemaOrders = new Schema({

    ClientName:String,
    OrderName:String,
    Quantity:Number,
    Email: { type: String, unique: true, required: true },
    CreatedOn: { type: Date, default: Date.now() },
    SellmanId: String

});



var UsersModelAdmin = mongoose.model("usersAdmins", DatabaseSchema);
var UsersModelSellsmen = mongoose.model("usersSellmens", DatabaseSchemaSellmen);
var OrdersModel =mongoose.model("orders",DatabaseSchemaOrders)
//This function saves admin
function saveAdminUser(userData) {
    var deffered = q.defer();
    var user = new UsersModelAdmin(userData);
    user.save(function (err, userData) {
        if (err) {
            console.log("There is an error found while saving user");

            deffered.reject("Error while recording user info");
        }
        else {
            console.log("User Was Saved Successfully");
            deffered.resolve(userData);
        }
    });
    return deffered.promise;
}
exports.saveAdminUser = saveAdminUser;
function saveSellsmen(userData) {
    var deffered = q.defer();
    var user = new UsersModelSellsmen(userData);
    user.save(function (err, userData) {
        if (err) {
            console.log("There is an error found while saving user");
            console.log("err");
            deffered.reject("Error while recording user info");
        }
        else {
            console.log("User Was Saved Successfully");
            deffered.resolve(userData);
        }
    });
    return deffered.promise;
};
exports.saveSellsmen=saveSellsmen;


function findUser(query) {
    var deferred = q.defer();
    UsersModelAdmin.findOne(query, function (err, record) {
        if (err) {
            console.log("Error in finding User");
            console.log(err);
            deferred.reject("Error in finding User");
        }
        else {
            deferred.resolve(record);
        }
    });
    return deferred.promise;
}
exports.findUser = findUser;



//----------------for logging in sellesmen------

function findUserSellmen(query) {
    var deferred = q.defer();
    UsersModelSellsmen.findOne(query, function (err, record) {
        if (err) {
            console.log("Error in finding User");
            console.log(err);
            deferred.reject("Error in finding User");
        }
        else {
            deferred.resolve(record);
        }
    });
    return deferred.promise;
}
exports.findUserSellmen = findUserSellmen;


//this function is for getting users sellsmen list
function getSalesmen(query) {
    var deffered = q.defer();
    UsersModelSellsmen.find(query, function (err, record) {
        if (err) {
            deffered.reject("Error in fecthing User");
        }
        else {
            deffered.resolve(record);
        }
    });
    return deffered.promise;
}
exports.getSalesmen = getSalesmen;
//this function is for saving orders


function placeOrder(userData) {
    var deffered = q.defer();
    var user = new OrdersModel(userData);
    user.save(function (err, userData) {
        if (err) {
            console.log("There is an error found while saving user");
            console.log("err");
            deffered.reject("Error while recording user info");
        }
        else {
            console.log("User Was Saved Successfully");
            deffered.resolve(userData);
        }
    });
    return deffered.promise;
};
exports. placeOrder= placeOrder;