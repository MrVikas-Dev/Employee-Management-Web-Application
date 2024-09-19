require('dotenv').config();
const express = require('express');
const cors = require('cors'); // Import cors
const app = express();
const { sequelize } = require('./config/database');
const route = require('./src/routes');
const { seeder } = require('./src/controller/admin');

app.use(cors({ // Use CORS middleware before defining routes
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
}));

app.use(express.json());

app.use(route);

const port = process.env.PORT || 8080;

sequelize.authenticate().then(() => {
    app.listen(port, () => {
        console.log('Connection Established With Database');
        console.log(`Server Started On Port ${port}`);
        seeder();
    });
}).catch((err) => {
    console.log(err);
});
