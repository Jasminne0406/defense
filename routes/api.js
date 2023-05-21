const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
const controller = require("../controller/index.js");
const teacherController = require("../teacherController/index.js");
const studentController = require("../studentController/index.js");
const cookieParser = require('cookie-parser');
const cors = require('cors');

router.use(cors({
    origin: "http://localhost:3001",
    credentials: true
}));

router.use(cookieParser());
router.use(teacherController);
router.use(studentController);
router.use(controller);
module.exports = router; 