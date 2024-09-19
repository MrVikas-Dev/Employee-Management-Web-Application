const { where } = require("sequelize");
const Employee = require("../src/model/Employee");
const Admin = require("../src/model/Admin");
const jwt = require('jsonwebtoken');

const employeeAuth = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(403);

    const token = authHeader.split(' ')[1];

    jwt.verify(
        token,
        process.env.TOKEN_SECRET,
        async (err, decoded) => {
            if (err) return res.sendStatus(401)
            let user = await Employee.findOne({
                where: {
                    id: decoded.sub
                }
            })

            if (user == null) return res.sendStatus(401);
            req.user = user.dataValues;
            next()
        }
    )
}

const adminAuth = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(403);

    const token = authHeader.split(' ')[1];

    jwt.verify(
        token,
        process.env.TOKEN_SECRET,
        async (err, decoded) => {
            if (err) return res.sendStatus(401)
            let user = await Admin.findOne({
                where: {
                    id: decoded.sub
                }
            })

            if (user == null) return res.sendStatus(401);
            req.user = user.dataValues;
            next()
        }
    )
}

module.exports = {
    employeeAuth,
    adminAuth
}