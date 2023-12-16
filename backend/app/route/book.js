module.exports = (app) => {

    const book = require('../controller/book.js');
    
    //ПОЛУЧАЕМ все книги с их жанрами и авторами
    app.get('/api/listBooks', book.findAll);

    //ПОЛУЧАЕМ одну книгу по id с её жанрами и авторами
    app.get('/api/book/:id', book.findById);

    //ДОБАВЛЯЕМ книгу со связями с жанрами и авторами
    app.post('/api/addBook', book.addBook);
};