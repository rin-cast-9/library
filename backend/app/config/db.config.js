var dbProperties = {
    database: process.env.DB_NAME, // название базы данных
    username: process.env.DB_USER, // имя пользователя, для которого настроены права к базе данных, 'root' задаётся по умолчанию
    password: process.env.DB_PASSWORD, // пароль пользователя, по умолчанию пароль пустой
    host: process.env.DB_HOST, // имя сервера, на котором расположена база данных
    dialect: 'mysql', // используемая СУБД
    port: process.env.DB_PORT,
    pool: { // параметры соединения
        max: 5, // максимальное количество одновременно открытых соединений
        min: 0, // минимальное количество соединений
        acquire: 30000, // максимальное время в миллисекундах, в течение которого пул (набор соединений к БД) будет пытаться установить соединение, прежде чем выдаст ошибку
        idle: 10000 // время в миллисекундах, в течение которого соединение может простаивать, прежде чем оно будет удалено
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

module.exports = db;