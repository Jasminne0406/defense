// let mysql = require('mysql');
// let con = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "123456789"
// });

// con.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
// });

// con.query("use `db`");

// module.exports={
//     con
// }
// con.query("CREATE DATABASE DB", function (err, result) {
//     if (err) throw err;
//     console.log("Database created");
// });

// var studentTable = "CREATE TABLE student (student_id VARCHAR(255) PRIMARY KEY, name VARCHAR(255), address VARCHAR(255), email VARCHAR(225),phone VARCHAR(225))";
// con.query(studentTable, function (err, result) {
//     if (err) throw err;
//     console.log("Student Table created");
// });

// var teacherTable = "CREATE TABLE teacher (teacher_id VARCHAR(255) PRIMARY KEY, name VARCHAR(255), address VARCHAR(255), email VARCHAR(225),phone VARCHAR(225))";
// con.query(teacherTable, function (err, result) {
//     if (err) throw err;
//     console.log("Teacher Table created");
// });

// var courseTable = "CREATE TABLE course (course_id VARCHAR(255) PRIMARY KEY, teacher_id VARCHAR(255), name VARCHAR(255))";
// con.query(courseTable, function (err, result) {
//     if (err) throw err;
//     console.log("Course Table created");
// });

// var yearTable = "CREATE TABLE year (year_id VARCHAR(255) PRIMARY KEY, year INT, FromYear INT, ToYear INT)";
// con.query(yearTable, function (err, result) {
//     if (err) throw err;
//     console.log("Year Table created");
// });

// var groupTable = "CREATE TABLE groupPerYear (group_id VARCHAR(255) PRIMARY KEY, name VARCHAR(255))";
// con.query(groupTable, function (err, result) {
//     if (err) throw err;
//     console.log("Group Table created");
// });

// var year_group = "CREATE TABLE yg (yg_id VARCHAR(255) PRIMARY KEY, year_id VARCHAR(255), group_id VARCHAR(255))";
// con.query(year_group, function (err, result) {
//     if (err) throw err;
//     console.log("year_group Table created");
// });

// var student_yg = "CREATE TABLE student_yg (student_id VARCHAR(255), yg_id VARCHAR(255))";
// con.query(student_yg, function (err, result) {
//     if (err) throw err;
//     console.log("student_yg Table created");
// });

// var account = "CREATE TABLE account (id VARCHAR(255) PRIMARY KEY, email VARCHAR(255) UNIQUE, password VARCHAR(255))";
// con.query(account, function (err, result) {
//     if (err) throw err;
//     console.log("account Table created");
// });

