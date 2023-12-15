const Sequelize = require("sequelize");

module.exports = function(sequelize, DataTypes) {
    return sequelize.define("writer", {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false
        }
    });
};