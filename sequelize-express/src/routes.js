const express = require('express');
const { Register, Login, UpdateDetails, GetAllEmployee, GetNewEmployees, SetEmployeeToVerified, UpdateUserDetails, ArchiveEmployee, AssignDepartment } = require('./controller/employee');
const router = express.Router();
const { employeeAuth, adminAuth } = require('../config/authentication');
const { GetAllDepartments, CreateNewDepartment, UpdateDepartment } = require('./controller/department');
const { AdminLogin } = require('./controller/admin');

router.post('/employee/register', Register);
router.post('/employee/login', Login);
router.put('/employee/update-details', employeeAuth, UpdateDetails);

router.get('/employees',adminAuth,GetAllEmployee);
router.get('/employees-new',adminAuth,GetNewEmployees);
router.patch('/employee-verify',adminAuth,SetEmployeeToVerified);
router.patch('/employee-department',adminAuth,AssignDepartment);
router.patch('/employee',adminAuth,UpdateUserDetails);
router.delete('/employee',adminAuth,ArchiveEmployee);


router.post('/admin/login',AdminLogin);


router.get('/departments',adminAuth,GetAllDepartments);
router.post('/department',adminAuth,CreateNewDepartment);
router.patch('/department',adminAuth,UpdateDepartment);

module.exports = router;