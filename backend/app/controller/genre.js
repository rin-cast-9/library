var db = require('../config/db.config.js');
var Genre = db.genre;
var globalFunctions = require('../config/global.functions.js');

//ПОЛУЧАЕМ все жанры
exports.findAll = (req, res) => {
   Genre.findAll()
        .then(objects => {
            globalFunctions.sendResult(res, objects);
        }).catch(err => {
            globalFunctions.sendError(res, err);
        })
};

//СОЗДАЁМ запись жанра
exports.create = (req,res) => {
    Genre.create({
        name: req.body.name
    })
        .then(object => {
            globalFunctions.sendResult(res,object);
        })
        .catch(err => {
            globalFunctions.sendError(res,err);
        });
};

//ОБНОВЛЯЕМ имя жанра
exports.update = (req, res) => {
    Genre.update({
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

//НАХОДИМ жанр по id
exports.findById = (req,res) => {
    Genre.findByPk(req.params.id)
        .then(object => {
            globalFunctions.sendResult(res,object);
        })
        .catch(err => {
            globalFunctions.sendError(res,err);
        })
};

//НАХОДИМ жанр по названию (name)
exports.findByName = (req,res) => {
    Genre.findAll({
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