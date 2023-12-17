const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('wallet', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    money: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  });
};
