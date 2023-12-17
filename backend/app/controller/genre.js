var db = require('../config/db.config.js');
var Genre = db.genre;
var Book = db.book;
var BookGenre = db.book_genre;
var User = db.user;
var UserBook = db.user_book;
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

//ПОЛУЧЕНИЕ книг одного жанра по id
exports.findByGenre = (req,res) => {
    Genre.findAll({
        include: [
            {
                model: BookGenre,
                requierd: true,
                include: [
                    {
                        model: Book,
                        required: true
                    }
                ] 
            }
        ],
        where: {
            id: req.params.id
        }
    })
    .then(objects => {
        globalFunctions.sendResult(res,objects);
    })
    .catch(err => {
        globalFunctions.sendError(res,err);
    })
};

//ПОЛУЧЕНИЕ книг одного жанра по id и по пользователю
exports.findByGenreByUser = (req,res) => {
    Genre.findAll({
        include: [
            {
                model: BookGenre,
                requierd: true,
                include: [
                    {
                        model: Book,
                        required: true,
                        include: [
                            {
                                model: UserBook,
                                required: false,
                                include: [
                                    {
                                        model: User,
                                        required: true,
                                        where: {
                                            id: req.params.user_id
                                        }
                                    }
                                ] 
                            }
                        ]
                    }
                ] 
            }
        ],
        where: {
            id: req.params.genre_id
        }
    })
    .then(objects => {
        globalFunctions.sendResult(res,objects);
    })
    .catch(err => {
        globalFunctions.sendError(res,err);
    })
};