var db = require('../config/db.config.js');
var Book = db.book;
var Genre = db.genre;
var Writer = db.writer;
var BookGenre = db.book_genre;
var BookWriter = db.book_writer;
var globalFunctions = require('../config/global.functions.js');

exports.findAll = (req,res) => {
    Book.findAll({
        include: [
            {
                model: BookGenre,
                required: true,
                include: [
                    {
                        model: Genre,
                        required: true
                    }
                ]
            },
            {
                model: BookWriter,
                requierd: true,
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
    Book.findAll({
        include: [
            {
                model: BookGenre,
                required: true,
                include: [
                    {
                        model: Genre,
                        required: true
                    }
                ]
            },
            {
                model: BookWriter,
                requierd: true,
                include: [
                    {
                        model: Writer,
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

exports.addBook = async (req,res) => {
    // все данные добавляем в транзакции
    const t = await Book.sequelize.transaction();

    try {
        const createdBook = await Book.create({
            name: req.body.name,
            cost: req.body.cost,
        }, { transaction: t });

        const book_id = createdBook.id;
    
        const writers = req.body.writers;

        const bookWriterValues = writers.flatMap(writer => // flatMap нужен для преобразования массива students в набор объектов для добавления в таблицу attestation_book
            [
                {
                    book_id: book_id,
                    writer_id: writer
                }
            ]
        );

        const genres = req.body.genres;

        const bookGenreValues = genres.flatMap(genre => // flatMap нужен для преобразования массива students в набор объектов для добавления в таблицу attestation_book
            [
                {
                    book_id: book_id,
                    genre_id: genre
                }
            ]
        );

        // bulkCreate - позволяет добавлять в таблицу сразу несколько записей
        await BookWriter.bulkCreate(bookWriterValues, { transaction: t });

        // bulkCreate - позволяет добавлять в таблицу сразу несколько записей
        await BookGenre.bulkCreate(bookGenreValues, { transaction: t });

        await t.commit();

        globalFunctions.sendResult(res, 'Запись о книге успешно добавлена');

    } catch (err) {
        globalFunctions.sendError(res, err);
    }
};


/*
Book.findAll({
        include: [
            {
                model: BookGenre,
                required: true,
                include: [
                    {
                        model: Genre,
                        required: true
                    }
                ]
            },
            {
                model: BookWriter,
                requierd: true,
                include: [
                    {
                        model: Writer,
                        required: true
                    }
                ] 
            }
        ]
    })
*/

/*
db.sequelize.query(
        `SELECT book.*, writer.name AS writer_name, genre.name AS genre_name 
        FROM book
        INNER JOIN book_genre ON book.id = book_genre.book_id
        INNER JOIN book_writer ON book.id = book_writer.book_id
        INNER JOIN writer ON writer.id = book_writer.writer_id
        INNER JOIN genre ON genre.id = book_genre.genre_id`,
        {
            type: db.sequelize.QueryTypes.SELECT
        })
*/