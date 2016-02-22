var mongoose = require("mongoose");
var connection = mongoose.connect("mongodb://tahahasan:tj14bsse@ds061395.mongolab.com:61395/salesmen");
var uniqueValidator = require('mongoose-unique-validator');
var bcrypt = require("bcrypt-nodejs");
var q =require("q");
var Schema = mongoose.schema;
var UserSchema =new Schema({
	FirstName : String,
	LastName  : String,
	Email: {type:String, unique: true, require: true},
	Password:String,
	CreatedOn:{type: Date ,default: Date.now()},
	FirebaseToken:String
});
var UserModel = mongoose.model("users", UserSchema);
function saveUser(userProps) {
    var deferred = q.defer();
    var user = new UserModel(userProps);
    user.save(function (err, data) {
        if (err) {
            console.log("Error in saving User");
            console.log(err);
            deferred.reject("Error occurred while saving user");
        }
        else {
            console.log("User Saved Succesfully");
            deferred.resolve(data);
        }
    });
    return deferred.promise;
}
exports.saveUser = saveUser;
function findUser(query) {
    var deferred = q.defer();
    UserModel
        .findOne(query, function (err, record) {
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
var companiesSchema = new mongoose.Schema({
    name: {type: String, required: true},
    address: {type: String, required: true},
    usersIds: {type: []},
    adminId: String,
    createdOn: {type: Date, default: Date.now()}
});
exports.companiesModel = mongoose.model("companies", companiesSchema);
exports.companiesSchema = companiesSchema;
exports.findUser = findUser;
