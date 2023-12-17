const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    subscription_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'subscription',
        key: 'id'
      }
    },
    subscription_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 2,
      references: {
        model: 'role',
        key: 'id'
      }
    },
    wallet_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'wallet',
        key: 'id'
      }
    }
  });
};
