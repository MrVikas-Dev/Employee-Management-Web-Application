const { where,Op  } = require("sequelize");
const Department = require("../model/Department");
const { serverError, okResponse, badRequest, notFound } = require("../utils/responses");

const CreateNewDepartment = async(request,response)=>{
    try {

        const { name } = request.body;

        const duplicateDepartment = await Department.findOne({
            where:{
                name,
                active: true
            }
        });

        if(duplicateDepartment != null) return response.status(409).json({ "sucess": false, "message": "Name Already Exist" });

        await Department.create({
            name
        })
        
        return okResponse(response, true, 'Department Created');

    } catch (error) {
        console.error(error);
        return serverError(response,error);
    }
}

const UpdateDepartment = async(request,response)=>{
    try {

        const { id , name } = request.body;

        if(!id) return badRequest(response,'Please Provide Id');
        if(!name) return badRequest(response,'Please Provide Name');

        const department = await Department.findOne({
            where:{
                id: id,
                active: true
            }
        })

        if(!department) return notFound(response,'Cannot Find Department');

        const duplicateDepartment = await Department.findOne({
            where:{
                id: {
                    [Op.ne]: department.id
                },
                name,
                active: true
            }
        });

        if(duplicateDepartment != null) return response.status(409).json({ "sucess": false, "message": "Name Already Exist" });

        await Department.update({
            name: name
        }, {
            where: {
                id: department.id
            }
        });
        
        return okResponse(response,true,'Department Updated');
    } catch (error) {
        console.error(error);
        return serverError(response,error);
    }
}

const GetAllDepartments = async (request,response) => {
    try {

        const allDepartments = await Department.findAll({
            where:{
                active: true
            }
        });

        return okResponse(response,allDepartments,'All Departments');
        
    } catch (error) {
        console.error(error);
        return serverError(response,error);
    }
}

module.exports = {
    CreateNewDepartment,
    UpdateDepartment,
    GetAllDepartments
}