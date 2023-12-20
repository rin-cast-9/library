var db = require('../config/db.config.js');
var Subscription = db.subscription;
var globalFunctions = require('../config/global.functions.js');

exports.findAll = (req, res) => {
    Subscription.findAll()
        .then(objects => {
            globalFunctions.sendResult(res, objects);
        }).catch(err => {
            globalFunctions.sendError(res, err);
        })
};

exports.findById = (req,res) => {
    Subscription.findByPk(req.params.id)
        .then(object => {
            globalFunctions.sendResult(res,object);
        })
        .catch(err => {
            globalFunctions.sendError(res,err);
        })
};