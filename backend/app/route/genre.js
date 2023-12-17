module.exports = (app) => {

    const genre = require('../controller/genre.js');
    
    //ПОЛУЧАЕМ все жанры
    app.get('/api/listGenres', genre.findAll);

    //СОЗДАЁМ запись жанра
    app.post('/api/addGenre', genre.create);

    //ОБНОВЛЯЕМ имя жанра
    app.post('/api/updateGenre/:id', genre.update);

    //НАХОДИМ жанр по id
    app.get('/api/genre/:id', genre.findById);

    //НАХОДИМ жанр по названию (name)
    app.get('/api/genre/name/:name', genre.findByName);

    //ПОЛУЧАЕМ книги одного автора по id
    app.get('/api/listGenreBooks/:id', genre.findByGenre);

    //ПОЛУЧАЕМ книги одного автора по id и по пользователю
    app.get('/api/listGenreBooks/genreId=:genre_id/userId=:user_id/', genre.findByGenreByUser);
};