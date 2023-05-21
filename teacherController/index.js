const express = require('express');
const route = express.Router();
const assignment = require("./assigment");
const session = require("./session");
const course = require("./course");
const teacher = require("./teacher");
const controller = require("../controller/authentication");

route.get('/teacher/logined',controller.authenticate,teacher.logined);
route.post('/teacher/view/course',controller.authenticate,course.detail);
route.post('/teacher/view/studentsInACourse',controller.authenticate,course.studentsInACourse);
route.post('/teacher/search/studentsInACourse',controller.authenticate,course.searchStudentsInACourse);
route.post('/teacher/view/searchStudentsInACourse',controller.authenticate,course.groupStudentsInACourse);
route.post('/teacher/create/assignment',controller.authenticate,assignment.create);
route.post('/teacher/score/assignment',controller.authenticate,assignment.score);
route.put('/teacher/update/assignment',controller.authenticate,assignment.update);
route.delete('/teacher/delete/assignment',controller.authenticate,assignment._delete);
route.post('/teacher/view/assignments',controller.authenticate,assignment.view);
route.post('/teacher/viewDetail/assignment',controller.authenticate,assignment.viewDetail);
route.post('/teacher/viewByGroup/assignments',controller.authenticate,assignment.viewByGroup);
route.post('/teacher/create/session',controller.authenticate,session.create);
route.get('/teacher/detail/session',controller.authenticate,session.detail);
route.get('/teacher/detail/assignment',controller.authenticate,assignment.detail);
route.get('/teacher/viewAll/assignment',controller.authenticate,assignment.viewAll);
route.post('/teacher/viewAll/session',controller.authenticate,session.displayAll);
route.post('/teacher/viewByGroup/session',controller.authenticate,session.displayByGroup);
route.post('/teacher/record/attendance',controller.authenticate,session.attendance);


module.exports = route;    