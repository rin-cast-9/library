const Sequelize = require("sequelize");

module.exports = function(sequelize, DataTypes) {
    return sequelize.define("book_genre", {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        book_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "book",
                key: "id"
            }
        },
        genre_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "genre",
                key: "id"
            }
        }
    });
};