var dbProperties = {
    database: 'book_store',
    username: 'root',
    password: '',
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};

var Sequelize = require('sequelize');
var sequelize = new Sequelize(
    dbProperties.database, dbProperties.username, dbProperties.password,
    {
        host: dbProperties.host,
        port: dbProperties.port,
        dialect: dbProperties.dialect,
        operatorsAliases: false,
        pool: {
            max: dbProperties.max,
            min: dbProperties.pool.min,
            acquire: dbProperties.pool.acquire,
            idle: dbProperties.pool.idle
        },
        define: {
            freezeTableName: true,
            timestamps: false
        }
    }
);

var init_models = require('../model/init-models');
var db = init_models.initModels(sequelize);

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.role.create({
    id: 1,
    name: "Администратор"
})
.then(newReport => {
    console.log('Запись роли администратора создана');
})
.catch(error => {
    console.error('Запись роли администратора существует');
});

db.role.create({
    id: 2,
    name: "Пользователь"
})
.then(newReport => {
    console.log('Запись роли пользователя создана');
})
.catch(error => {
    console.error('Запись роли пользователя существует');
});

db.subscription.create({
    id:1,
    name: "Стандартная"
}).then(newReport => {
    console.log('Запись роли подписки создана');
})
.catch(error => {
    console.error('Запись роли подписки существует');
});

db.subscription.create({
    id:2,
    name: "Студенческая"
}).then(newReport => {
    console.log('Запись роли подписки создана');
})
.catch(error => {
    console.error('Запись роли подписки существует');
});

db.subscription.create({
    id:3,
    name: "Премиум"
}).then(newReport => {
    console.log('Запись роли подписки создана');
})
.catch(error => {
    console.error('Запись роли подписки существует');
});

module.exports = db;