var DataTypes = require("sequelize").DataTypes;
var _book = require("./book");
var _book_genre = require("./book_genre");
var _book_writer = require("./book_writer");
var _genre = require("./genre");
var _role = require("./role");
var _sales = require("./sales");
var _subscription = require("./subscription");
var _user = require("./user");
var _user_book = require("./user_book");
var _writer = require("./writer");

function initModels(sequelize) {
  var book = _book(sequelize, DataTypes);
  var book_genre = _book_genre(sequelize, DataTypes);
  var book_writer = _book_writer(sequelize, DataTypes);
  var genre = _genre(sequelize, DataTypes);
  var role = _role(sequelize, DataTypes);
  var sales = _sales(sequelize, DataTypes);
  var subscription = _subscription(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);
  var user_book = _user_book(sequelize, DataTypes);
  var writer = _writer(sequelize, DataTypes);

  book.hasMany(book_genre, {foreignKey: "book_id", onDelete: "CASCADE"});
  book.hasMany(book_writer, {foreignKey: "book_id", onDelete: "CASCADE"});
  book.hasMany(user_book, {foreignKey: "book_id", onDelete: "CASCADE"});
  genre.hasMany(book_genre, {foreignKey: "genre_id", onDelete: "CASCADE"});
  role.hasMany(user, {foreignKey: "role_id", onDelete: "CASCADE"});
  subscription.hasMany(user, {foreignKey: "subscription_id", onDelete: "CASCADE"});
  user.hasMany(user_book, {foreignKey: "user_id", onDelete: "CASCADE"});
  writer.hasMany(book_writer, {foreignKey: "writer_id", onDelete: "CASCADE"});

  book_genre.belongsTo(book, {foreignKey: "book_id"});
  book_writer.belongsTo(book, {foreignKey: "book_id"});
  user_book.belongsTo(book, {foreignKey: "book_id"});
  book_genre.belongsTo(genre, {foreignKey: "genre_id"});
  user.belongsTo(role, {foreignKey: "role_id"});
  user.belongsTo(subscription, {foreignKey: "subscription_id"});
  user_book.belongsTo(user, {foreignKey: "user_id"});
  book_writer.belongsTo(writer, {foreignKey: "writer_id"});

  return {
    book,
    book_genre,
    book_writer,
    genre,
    role,
    sales,
    subscription,
    user,
    user_book,
    writer,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
