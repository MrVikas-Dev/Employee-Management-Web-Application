const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database');
const Department = require('./Department');

const Employee = sequelize.define('employees', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
    },
    password: {
        type: DataTypes.STRING,
    },
    department_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'departments',
            key: 'id',
        }
    },
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
    verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    role: {
        type: DataTypes.CHAR(36),
        defaultValue: 'USER',
    },
}, {
    timestamps: false
});

Employee.belongsTo(Department, { foreignKey: 'department_id' });
module.exports = Employee