const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database')


const Department = sequelize.define('departments', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
    },
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    }
}, {
    timestamps: false
});

module.exports = Department;