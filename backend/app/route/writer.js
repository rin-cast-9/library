module.exports = (app) => {

    const writer = require('../controller/writer.js');
    
    //ПОЛУЧАЕМ все жанры
    app.get('/api/writers', writer.findAll);

    //СОЗДАЁМ запись жанра
    app.post('/api/addWriter', writer.create);

    //ОБНОВЛЯЕМ имя жанра
    app.post('/api/updateWriter/:id', writer.update);

    //НАХОДИМ жанр по id
    app.get('/api/writer/:id', writer.findById);

    //НАХОДИМ жанр по названию (name)
    app.get('/api/writer/name/:name', writer.findByName);
};