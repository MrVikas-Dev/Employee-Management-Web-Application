const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database')

const Admin = sequelize.define('admins', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },
}, {
  timestamps: false
});

module.exports = Admin;