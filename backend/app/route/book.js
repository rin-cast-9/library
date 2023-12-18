module.exports = (app) => {

    const book = require('../controller/book.js');
    
    //ПОЛУЧАЕМ все книги с их жанрами и авторами по пользователю
    app.get('/api/listBooks/:id', book.findAll);

    //ПОЛУЧАЕМ все книги с их жанрами и авторами
    app.get('/api/listBooks', book.findAllWithoutUser);

    //ПОЛУЧАЕМ одну книгу по id с её жанрами и авторами
    app.get('/api/book/:book_id', book.findById);

    //ДОБАВЛЯЕМ книгу со связями с жанрами и авторами
    app.post('/api/addBook', book.addBook);

    //УДАЛЯЕМ книгу по id
    app.post('/api/deleteBook/:id', book.deleteBook);

    //ОБНОВЛЯЕМ цену книги по id
    app.post('/api/updateCost/:id', book.updateCost);

    //ОБНОВЛЯЕМ название книги по id
    app.post('/api/updateBookName/:id', book.updateName);

    //ОБНОВЛЯЕМ описание книги по id
    app.post('/api/updateBookDescription/:id', book.updateDescription);

    //ПОЛУЧАЕМ книги одного автора по id
    app.get('/api/listWriterBooks/:id', book.findByWriter);

    //ПОЛУЧАЕМ книги одного автора по id и по пользователю
    app.get('/api/listWriterBooks/:writer_id/user/:user_id', book.findByWriterByUser);

    //БИБЛИОТЕКА пользователя
    app.get('/api/library/:id', book.findByUser);

    //ДОБАВЛЯЕМ книгу в библиотеку пользователя
    app.post('/api/addBookToLibrary', book.addToLibrary);
};