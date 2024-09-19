const Sequelize = require('sequelize');


const sequelize = new Sequelize(
    process.env.MYSQL_DATABASE_NAME,
    process.env.MYSQL_USERNAME,
    process.env.MYSQL_DATABASE_PASSWORD,
    {
        host: process.env.MYSQL_DATABASE_HOST,
        port: process.env.MYSQL_DATABASE_PORT,
        dialect: 'mysql',
    }
)

module.exports = {
    sequelize
}