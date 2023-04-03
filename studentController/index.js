const express = require('express');
const route = express.Router();
const assignment = require("./assignment");
const attendance = require("./attendance");
const student = require("./student");
const session =require("./session")
const controller = require("../controller/authentication");

route.get('/student/logined',controller.authenticate,student.logined)
route.post('/student/submit/assignment',controller.authenticate,assignment.submitted);
route.get('/student/viewAll/assignment/:id',controller.authenticate,assignment.viewAll);
route.get('/student/view/assignment/:id',controller.authenticate,assignment.view);
route.get('/student/detail/assignment',controller.authenticate,assignment.detail)
route.post('/student/attend/course',controller.authenticate,attendance.attended);
route.get('/student/displayAll/session',controller.authenticate,session.displayAll);
route.get('/student/detail/session',controller.authenticate,session.detail);
module.exports = route;  