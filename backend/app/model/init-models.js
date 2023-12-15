const DataTypes = require("sequelize").DataTypes;
const _book = require("./book");
const _book_genre = require("./book_genre");
const _book_writer = require("./book_writer");
const _genre = require("./genre");
const _sales = require("./sales");
const _subscription = require("./subscription");
const _user = require("./user");
const _user_book = require("./user_book");
const _writer = require("./writer");

function initModels (sequelize) {
    const book = _book(sequelize, DataTypes);
    const book_genre = _book_genre(sequelize, DataTypes);
    const book_writer = _book_writer(sequelize, DataTypes);
    const genre = _genre(sequelize, DataTypes);
    const sales = _sales(sequelize, DataTypes);
    const subscription = _subscription(sequelize, DataTypes);
    const user = _user(sequelize, DataTypes);
    const user_book = _user_book(sequelize, DataTypes);
    const writer = _writer(sequelize, DataTypes);

    book.hasMany(book_genre, {foreignKey: "book_id", onDelete: "CASCADE"});
    book.hasMany(book_writer, {foreignKey: "book_id", onDelete: "CASCADE"});
    book.hasMany(user_book, {foreignKey: "book_id", onDelete: "CASCADE"});
    genre.hasMany(book_genre, {foreignKey: "genre_id", onDelete: "CASCADE"});
    subscription.hasMany(user, {foreignKey: "subscription_id", onDelete: "CASCADE"});
    user.hasMany(user_book, {foreignKey: "user_id", onDelete: "CASCADE"});
    writer.hasMany(book_writer, {foreignKey: "writer_id", onDelete: "CASCADE"});

    book_genre.belongsTo(book, {foreignKey: "book_id"});
    book_genre.belongsTo(genre, {foreignKey: "genre_id"});
    book_writer.belongsTo(book, {foreignKey: "book_id"});
    book_writer.belongsTo(writer, {foreignKey: "writer_id"});
    user.belongsTo(subscription, {foreignKey: "subscription_id"});
    user_book.belongsTo(book, {foreignKey: "book_id"});
    user_book.belongsTo(user, {foreignKey: "user_id"});

    return {
        book,
        book_genre,
        book_writer,
        genre,
        sales,
        subscription,
        user,
        user_book,
        writer
    };
}

module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;