var db = require('../config/db.config.js');
var Wallet = db.wallet;
var globalFunctions = require('../config/global.functions.js');

exports.findById = (req,res) => {
    Wallet.findByPk(req.params.id)
        .then(object => {
            globalFunctions.sendResult(res,object);
        })
        .catch(err => {
            globalFunctions.sendError(res,err);
        })
};

exports.updateWallet = (req,res) => {
    Wallet.update({
        money: req.body.money
    },
    {
        where: {
            id: req.params.id
        }
    })
        .then(object => {
            globalFunctions.sendResult(res, object)
        })
        .catch(err => {
            globalFunctions.sendError(res,err);
        })
};