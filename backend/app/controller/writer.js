var db = require('../config/db.config.js');
var Writer = db.writer;
var globalFunctions = require('../config/global.functions.js');

//ПОЛУЧАЕМ всех писателей
exports.findAll = (req, res) => {
    Writer.findAll()
        .then(objects => {
            globalFunctions.sendResult(res, objects);
        }).catch(err => {
            globalFunctions.sendError(res, err);
        })
};

//СОЗДАЁМ запись писателя
exports.create = (req,res) => {
    Writer.create({
        name: req.body.name
    })
        .then(object => {
            globalFunctions.sendResult(res,object);
        })
        .catch(err => {
            globalFunctions.sendError(res,err);
        });
};

//ОБНОВЛЯЕМ имя писателя
exports.update = (req, res) => {
    Writer.update({
            name: req.body.name,
        },
        {
            where: {
                id: req.params.id
            }   
        })
    .then(object => {
        globalFunctions.sendResult(res,object);
    })
    .catch(err => {
        globalFunctions.sendError(res,err);
    })
};

//НАХОДИМ писателя по id
exports.findById = (req,res) => {
    Writer.findByPk(req.params.id)
        .then(object => {
            globalFunctions.sendResult(res,object);
        })
        .catch(err => {
            globalFunctions.sendError(res,err);
        })
};

//НАХОДИМ писателя по названию (name)
exports.findByName = (req,res) => {
    Writer.findAll({
        where: {
            name: req.params.name
        }
    })
        .then(object => {
            globalFunctions.sendResult(res,object);
        })
        .catch(err => {
            globalFunctions.sendError(res,err);
        })
};