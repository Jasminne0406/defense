const user = require("./authentication");
const express = require('express');
const route = express.Router();
const student = require("./studentController");
const teacher = require("./teacherController");
const year = require("./year");
const course = require("./course");
const assignment = require("./assignment");


route.post('/login',user.authenticate,user.isAdmin, user.login);
route.post('/logout',user.authenticate,user.isAdmin, user.logout);
route.post('/admin/signUp/student', user.authenticate,user.isAdmin, student.signUp);
route.post('/admin/student/update',user.authenticate, user.isAdmin,student.update);
route.post('/admin/student/updateClass',user.authenticate,user.isAdmin, student.updateClass);
route.get('/admin/student/displayAll',user.authenticate, user.isAdmin,student.displayAll);
route.get('/admin/student/searchByCatagory',user.authenticate,user.isAdmin, student.searchByCatagory);
route.get('/admin/student/searchOneStudent/:search',user.authenticate,user.isAdmin, student.searchOneStudent);
route.put('/admin/student/delete/:id',user.authenticate,user.isAdmin, student._delete);
route.post('/admin/teacher/signUp',user.authenticate,user.isAdmin, teacher.signUp);
route.post('/admin/teacher/update',user.authenticate,user.isAdmin, teacher.update);
route.get('/admin/teacher/searchOne/:search',user.authenticate,user.isAdmin, teacher.searchOne);
route.delete('/admin/teacher/resign/:id',user.authenticate,user.isAdmin, teacher.resign);
route.get('/admin/teacher/seeDetail/:id',user.authenticate,user.isAdmin, teacher.seeDetail);
route.get('/admin/teacher/displayAll',user.authenticate,user.isAdmin, teacher.displayAll);
route.post('/admin/course/create',user.authenticate,user.isAdmin, course.create);
route.put('/admin/course/update/:id',user.authenticate,user.isAdmin, course.update);
route.delete('/admin/course/deleteByID/:id',user.authenticate,user.isAdmin, course.deleteByID);
route.get('/admin/course/search/:search',user.authenticate,user.isAdmin, course.search);
route.delete('/admin/year/deleteByID/:id',user.authenticate,user.isAdmin, year.deleteByID);
route.post('/admin/year/create',user.authenticate,user.isAdmin, year.create);
route.get('/admin/assignment/view/:id',user.authenticate,user.isAdmin,assignment.display)

module.exports = route;