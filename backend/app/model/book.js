const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('book', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    cost: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: ""
    }
  });
};
