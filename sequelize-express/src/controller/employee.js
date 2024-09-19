const { serverError, badRequest, okResponse, notFound, unAuthorizedAccess } = require("../utils/responses");
const Employee = require('../model/Employee');
const { where } = require("sequelize");
const bcrypt = require('bcrypt');
const Department = require("../model/Department");
const jwt = require('jsonwebtoken');

const Register = async (request, response) => {
    try {

        console.log(request.body);

        const { username, password, email,phone } = request.body;

        if (!username) return badRequest(response, 'Please Provide Username');
        if (!password) return badRequest(response, 'Please Provide Password');
        if (!email) return badRequest(response, 'Please Provide Email');
        if (!phone) return badRequest(response, 'Please Provide Phone');


        const duplicateUser = await Employee.findOne({
            where: {
                username: username,
                active: true
            }
        });

        if (duplicateUser != null) return response.status(409).json({ "sucess": false, "message": "Username Already Exist" });

        const hashPassword = await bcrypt.hash(password, 13);

        await Employee.create({
            username,
            password: hashPassword,
            email,
            phone
        });

        return okResponse(response, true, 'Registered Successfully');

    } catch (error) {
        console.error(error);
        return serverError(response, error);
    }
}

const Login = async (request, response) => {
    try {

        const { username, password } = request.body;

        if (!username) return badRequest(response, 'Please Provide Username');
        if (!password) return badRequest(response, 'Please Provide Password');

        const employee = await Employee.findOne({
            where: {
                username,
                active: true
            },
            include: [
                {
                    model: Department,
                    required: false
                }
            ]
        });

        if (employee == null) return notFound(response, 'Cannot Find Employee');

        let match = await bcrypt.compare(password, employee.password);

        if (!match) return unAuthorizedAccess(response, 'Invalid Credentials');

        if (employee.verified == false) return badRequest(response, 'Please Wait For Verification');

        const accessToken = jwt.sign(
            {
                sub: employee.id
            },
            process.env.TOKEN_SECRET,
            { expiresIn: "12h" }
        )

        return okResponse(response, { employee, token: accessToken }, 'Logged In Successfully');

    } catch (error) {
        console.error(error);
        return serverError(response, error);
    }
}

const UpdateDetails = async (request, response) => {
    try {

        const user = request.user;

        const { username, email } = request.body;

        if (username != undefined) {

            let duplicateUser = await Employee.findOne({
                where: {
                    username: username,
                    acitve: true
                }
            });

            if (duplicateUser != null) return response.status(409).json({ "sucess": false, "message": "Username Already Exist" });

        }

        if (email != undefined) {

            let duplicateUser = await Employee.findOne({
                where: {
                    email: email,
                    acitve: true
                }
            });

            if (duplicateUser != null) return response.status(409).json({ "sucess": false, "message": "Email Already Exist" });

        }


        const employeeToUpdate = {
            username: username ?? user.username,
            email: email ?? user.email
        }

        await Employee.update(employeeToUpdate, {
            where: {
                id: user.id
            }
        });

        const updatedEmployee = await Employee.findOne({
            where: {
                id: user.id
            }
        });

        return okResponse(response, { employee: updatedEmployee }, 'Profile Updated');
    } catch (error) {
        console.error(error);
        return serverError(response, error);
    }
}


const GetNewEmployees = async (request,response) => {
    try {

        const employees = await Employee.findAll({
            where:{
                active: true,
                verified: false
            },include: [
                {
                    model: Department,
                    required: false
                }
            ]
        });
        
        return okResponse(response,employees,'New Employee List');
    } catch (error) {
        console.error(error);
        return serverError(response, error);
    }
}

const GetAllEmployee = async (request,response) => {
    try {

        const employees = await Employee.findAll({
            where:{
                active: true,
            },include: [
                {
                    model: Department,
                    required: false
                }
            ]
        });
        
        return okResponse(response,employees,'New Employee List');
    } catch (error) {
        console.error(error);
        return serverError(response, error);
    }
}

const SetEmployeeToVerified = async (request,response) => {
    try {

        const { id } = request.body;

        if(!id) return badRequest(response,'Please Provide Id');

        const employee = await Employee.findOne({
            where:{
                id: id,
                active: true
            }
        })

        if(employee == null) return notFound(res,'Cannot Find Employee');

        await Employee.update({
            verified: true
        },{
            where:{
                id: employee.id
            }
        })
       
        return okResponse(response,true,'Employee Set To Verified');
    } catch (error) {
        console.error(error);
        return serverError(response, error);
    }
}

const AssignDepartment = async (request,response) => {
    try {

        const { employee_id, department_id } = request.body;

        const employee = await Employee.findOne({
            where:{
                id: employee_id,
                active: true
            }
        })

        if(employee == null) return notFound(res,'Cannot Find Employee');

        const department = await Department.findOne({
            where:{
                id: department_id,
                active: true
            }
        })

        if(department == null) return notFound(response,'Cannot Find Department');

        await Employee.update({
            department_id: department.id
        },{
            where:{
                id: employee.id
            }
        })
        
        return okResponse(response,true,'Employee Added To Department');
    } catch (error) {
        console.error(error);
        return serverError(response, error);
    }
}

const UpdateUserDetails = async (request,response) => {
    try {

        const { id , username, email } = request.body;

        if(!id) return badRequest(response,'Please Provide Id');

        const employee = await Employee.findOne({
            where:{
                id: id,
                active: true
            }
        })

        if(employee == null) return notFound(res,'Cannot Find Employee');

        if (username != undefined) {

            let duplicateUser = await Employee.findOne({
                where: {
                    username: username,
                    active: true
                }
            });

            if (duplicateUser != null) return response.status(409).json({ "sucess": false, "message": "Username Already Exist" });

        }

        if (email != undefined) {

            let duplicateUser = await Employee.findOne({
                where: {
                    email: email,
                    active: true
                }
            });

            if (duplicateUser != null) return response.status(409).json({ "sucess": false, "message": "Email Already Exist" });

        }

        const employeeToUpdate = {
            username: username ?? employee.username,
            email: email ?? employee.email
        }

        await Employee.update(employeeToUpdate, {
            where: {
                id: employee.id
            }
        });
        
        return okResponse(response,true,'Employee Details Updated');
    } catch (error) {
        console.error(error);
        return serverError(response, error);
    }
}

const ArchiveEmployee = async (request,response) => {
    try {

        const { id } = request.body;

        if(!id) return badRequest(response,'Please Provide Id');

        const employee = await Employee.findOne({
            where:{
                id: id,
                active: true
            }
        })

        if(employee == null) return notFound(res,'Cannot Find Employee');

        await Employee.update({
            active: false
        },{
            where:{
                id: employee.id
            }
        })
       
        return okResponse(response,true,'Employee Set To Inactive');
    } catch (error) {
        console.error(error);
        return serverError(response, error);
    }
}

module.exports = {
    Register,
    Login,
    UpdateDetails,
    GetNewEmployees,
    GetAllEmployee,
    SetEmployeeToVerified,
    AssignDepartment,
    UpdateUserDetails,
    ArchiveEmployee
}