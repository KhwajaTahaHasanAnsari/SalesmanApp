var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var schema = require("./schema");

var usersModel = schema.usersModel;
var companiesModel = schema.companiesModel;
var companiesSchema = schema.companiesSchema;


router.use(bodyParser.json());
router.use(bodyParser.urlencoded());

router.post("/create-company", function (req, res) {
    var company = new companiesModel(req.body);
    company.save(function (err, data) {
        res.send(err || data);
    });
});

router.get("/:uid", function (req, res) {
    companiesModel.findOne({adminId: req.params.uid}, function (err, data) {
        res.send(err || data);
    });
});

module.exports = router