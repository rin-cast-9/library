var db = require('../config/db.config.js');
var Book = db.book;
var Genre = db.genre;
var Writer = db.writer;
var BookGenre = db.book_genre;
var BookWriter = db.book_writer;
var User = db.user;
var UserBook = db.user_book;
var globalFunctions = require('../config/global.functions.js');

//ПОЛУЧЕНИЕ всех книг по пользователю
exports.findAll = (req,res) => {
    Book.findAll({
        include: [
            {
                model: BookGenre,
                required: false,
                include: [
                    {
                        model: Genre,
                        required: true
                    }
                ]
            },
            {
                model: BookWriter,
                requierd: false,
                include: [
                    {
                        model: Writer,
                        required: true
                    }
                ] 
            },
            {
                model: UserBook,
                required: false,
                include: [
                    {
                        model: User,
                        required: true,
                        where: {
                            id: req.params.id
                        }
                    }
                ]   
            }
        ]
    })
    .then(objects => {
        globalFunctions.sendResult(res,objects);
    })
    .catch(err => {
        globalFunctions.sendError(res,err);
    })
};

//ПОЛУЧЕНИЕ всех книг
exports.findAllWithoutUser = (req,res) => {
    Book.findAll({
        include: [
            {
                model: BookGenre,
                required: false,
                include: [
                    {
                        model: Genre,
                        required: true
                    }
                ]
            },
            {
                model: BookWriter,
                requierd: false,
                include: [
                    {
                        model: Writer,
                        required: true
                    }
                ] 
            }
        ]
    })
    .then(objects => {
        globalFunctions.sendResult(res,objects);
    })
    .catch(err => {
        globalFunctions.sendError(res,err);
    })
};

//ПОЛУЧАЕМ одну книгу по id с её жанрами и авторами
exports.findById = (req,res) => {
    Book.findOne({
        include: [
            {
                model: BookGenre,
                required: false,
                include: [
                    {
                        model: Genre,
                        required: true
                    }
                ]
            },
            {
                model: BookWriter,
                requierd: false,
                include: [
                    {
                        model: Writer,
                        required: true
                    }
                ] 
            }
        ],
        where: {
            id: req.params.book_id
        } 
    })
    .then(objects => {
        globalFunctions.sendResult(res,objects);
    })
    .catch(err => {
        globalFunctions.sendError(res,err);
    })
};

exports.addBook = async (req,res) => {

    const t = await Book.sequelize.transaction();

    try {
        const createdBook = await Book.create({
            name: req.body.name,
            cost: req.body.cost,
        }, { transaction: t });

        const book_id = createdBook.id;
    
        const writers = req.body.writers;

        //if (req.body.writers!=undefined && req.body.writers.length!=0) {
            const bookWriterValues = writers.flatMap(writer =>
                [
                    {
                        book_id: book_id,
                        writer_id: writer
                    }
                ]
            );
        //}

        const genres = req.body.genres;

        //if (req.body.genres!=undefined && req.body.genres.length!=0) {
            const bookGenreValues = genres.flatMap(genre =>
                [
                    {
                        book_id: book_id,
                        genre_id: genre
                    }
                ]
            );
        //}

        //if (req.body.writers!=undefined && req.body.writers.length!=0) {
            await BookWriter.bulkCreate(bookWriterValues, { transaction: t });
        //}

        //if (req.body.genres!=undefined && req.body.genres.length!=0) {
            await BookGenre.bulkCreate(bookGenreValues, { transaction: t });
        //}

        await t.commit();

        globalFunctions.sendResult(res, 'Запись о книге успешно добавлена');

    } catch (err) {
        globalFunctions.sendError(res, err);
    }
};

//УДАЛЯЕМ книгу по id
exports.deleteBook = (req, res) => {
    Book.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(() => {
            globalFunctions.sendResult(res, 'Запись о книге удалена')
        })
        .catch(err => {
            globalFunctions.sendError(res,err);
        })
};

//ОБНОВЛЯЕМ цену
exports.updateCost = (req, res) => {
    Book.update({
        cost: req.body.cost
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

//ОБНОВЛЯЕМ название книги
exports.updateName = (req, res) => {
    Book.update({
        name: req.body.name
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

//ПОЛУЧЕНИЕ книг одного писателя по id
exports.findByWriter = (req,res) => {
    Writer.findAll({
        include: [
            {
                model: BookWriter,
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

//ПОЛУЧЕНИЕ книг одного писателя по id и по пользователю
exports.findByWriterByUser = (req,res) => {
    Writer.findAll({
        include: [
            {
                model: BookWriter,
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
            id: req.params.writer_id
        }
    })
    .then(objects => {
        globalFunctions.sendResult(res,objects);
    })
    .catch(err => {
        globalFunctions.sendError(res,err);
    })
};

//БИБЛИОТЕКА пользователя
exports.findByUser = (req,res) => {
    User.findOne({
		include: [
			{
				model: UserBook,
				required: false,
				include: [
					{
						model: Book,
						required: true,
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
		globalFunctions.sendError(res, err);
	})
}
          
exports.addToLibrary = async (req, res) => {
    const { userId, bookId } = req.body;

    const t = await UserBook.sequelize.transaction();

    try {
        await UserBook.create({
            user_id: userId,
            book_id: bookId
        }, {transaction: t});

        await t.commit();

        globalFunctions.sendResult(res, "Книга успешно добавлена в библиотеку");
    } catch (err) {
        await t.rollback();
        globalFunctions.sendError(res, err);
    }
}

/*
Book.findAll({
        include: [
            {
                model: UserBook,
                required: false,
                include: [
                    {
                        model: Book,
                        required: true,
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
}
*/
