const dbProperties = {
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    dbProperties.database, dbProperties.username, dbProperties.password, {
        host: dbProperties.host,
        dialect: dbProperties.dialect,
        operatorsAliases: false,
        pool: {
            max: dbProperties.pool.max,
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

const init_models = require("../model/init-models");
const db = init_models.initModels(sequelize);

db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;