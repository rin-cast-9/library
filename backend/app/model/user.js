const Sequelize = require("sequelize");

module.exports = function(sequelize, DataTypes) {
    return sequelize.define("user", {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        login: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        subscription_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "subscription",
                key: "id"
            }
        },
        subscription_date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        }
    });
};