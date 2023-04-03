const express = require('express');
const route = express.Router();
const assignment = require("./assigment");
const session = require("./session");
const teacher = require("./teacher");
const controller = require("../controller/authentication");

route.get('/teacher/logined',controller.authenticate,teacher.logined);
route.post('/teacher/create/assignment',controller.authenticate,assignment.create);
route.post('/teacher/score/assignment',controller.authenticate,assignment.score);
route.put('/teacher/update/assignment',controller.authenticate,assignment.update);
route.delete('/teacher/delete/assignment',controller.authenticate,assignment._delete);
route.post('/teacher/view/assignments',controller.authenticate,assignment.view);
route.post('/teacher/create/session',controller.authenticate,session.create);
route.get('/teacher/detail/session',controller.authenticate,session.detail);
route.get('/teacher/detail/assignment',controller.authenticate,assignment.detail);
route.get('/teacher/viewAll/assignment',controller.authenticate,assignment.viewAll);
route.post('/teacher/displayAll/session',controller.authenticate,session.displayAll)
route.post('/teacher/record/attendance',controller.authenticate,session.attendance);


module.exports = route;    