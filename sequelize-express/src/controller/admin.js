
const { where } = require("sequelize");
const Admin = require("../model/Admin");
const { serverError, badRequest, okResponse, notFound, unAuthorizedAccess } = require("../utils/responses");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Employee = require("../model/Employee");


const AdminLogin = async (request, response) => {
    try {

        const { username, password } = request.body;

        if (!username) return badRequest(response, 'Please Provide Username');
        if (!password) return badRequest(response, 'Please Provide Password');

        const admin = await Admin.findOne({
            where: {
                username
            }
        })

        if (admin == null) return notFound(response, 'Cannot Find Admin');

        let match = await bcrypt.compare(password, admin.password);

        if (!match) return unAuthorizedAccess(response, 'Invalid Credentials');

        const accessToken = jwt.sign(
            {
                sub: admin.id
            },
            process.env.TOKEN_SECRET,
            { expiresIn: "12h" }
        )

        return okResponse(response, { admin, token: accessToken }, 'Logged In Successfully');
    } catch (error) {
        console.error(error);
        return serverError(response, error);
    }
}


const seeder = async () => {
    try {

        let count = await Admin.count();

        if (!count) {

            console.log('\x1b[100m\x1b[33m', 'Generating Admin Through Seeder');
            console.log('\x1b[100m\x1b[33m', 'Admin : { username: admin, password: 123456 }');


            let hashpassword = await bcrypt.hash('123456', 13);

            await Admin.create({
                username: 'admin',
                password: hashpassword
            })
            console.log('\x1b[0m')
        }

        return
    } catch (error) {
        console.error(error);
        return error;
    }
}


module.exports = {
    AdminLogin,
    seeder
}