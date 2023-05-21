const mysql = require('mysql');
const bcrypt = require('bcrypt');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456789',
  database: 'db'
});
const config = require('../routes/config')
const jwt = require('jsonwebtoken')

exports.studentsInACourse = async function studentsInACourse (req,res){
    const token = req.cookies.access_token
    const verified = jwt.verify(token,config.authentication.jwtSecret);
    // console.log(verified.id)
    // console.log(req.body.course_id)
    connection.query('SELECT id, name,gender,c.year_id ,group_name FROM student_yg yg JOIN yg y ON yg.yg_id = y.yg_id JOIN course c ON c.year_id = y.year_id JOIN student s ON s.id = yg.student_id WHERE c.course_id = ?' ,
    [req.body.course_id],
    (error,results)=>{
        if(error) throw error
        if(results.length==0){
            res.json({
                message: "There is none student in this course yet!!!" 
            })
            .status(400)
        }
        else{
            res.json({
                results: results
            })
            .status(200)
        }
    })
}

exports.groupStudentsInACourse = async function groupStudentsInACourse (req,res){
    const token = req.cookies.access_token
    const verified = jwt.verify(token,config.authentication.jwtSecret);
    // console.log(verified.id)
    // console.log(req.body.course_id)
    connection.query('SELECT id, name,gender,c.year_id ,group_name FROM student_yg yg JOIN yg y ON yg.yg_id = y.yg_id JOIN course c ON c.year_id = y.year_id JOIN student s ON s.id = yg.student_id WHERE c.course_id = ? AND group_name = ?' ,
    [req.body.course_id,req.body.group],
    (error,results)=>{
        if(error) throw error
        if(results.length==0){
            res.json({
                message: "There is none student in this course yet!!!" 
            })
            .status(400)
        }
        else{
            res.json({
                results: results
            })
            .status(200)
        }
    })
}

exports.searchStudentsInACourse = async function searchStudentsInACourse (req,res){
    const token = req.cookies.access_token
    const verified = jwt.verify(token,config.authentication.jwtSecret);
    // console.log(req.body.course_id)
    connection.query('SELECT id, name,gender,c.year_id ,group_name FROM student_yg yg JOIN yg y ON yg.yg_id = y.yg_id JOIN course c ON c.year_id = y.year_id JOIN student s ON s.id = yg.student_id WHERE c.course_id = ? AND id LIKE ? ' ,
    [req.body.course_id,req.body.search+"%"],
    (error,results)=>{
        if(error) throw error
        if(results.length==0){
            connection.query('SELECT id, name,gender,c.year_id ,group_name FROM student_yg yg JOIN yg y ON yg.yg_id = y.yg_id JOIN course c ON c.year_id = y.year_id JOIN student s ON s.id = yg.student_id WHERE c.course_id = ? AND name LIKE ? ' ,
            [req.body.course_id,req.body.search+"%"],
            (error,results)=>{
                if(results.length==0){
                    connection.query('SELECT id, name,gender,c.year_id ,group_name FROM student_yg yg JOIN yg y ON yg.yg_id = y.yg_id JOIN course c ON c.year_id = y.year_id JOIN student s ON s.id = yg.student_id WHERE c.course_id = ? AND gender LIKE ? ' ,
                    [req.body.course_id,req.body.search+"%"],
                    (error,results)=>{
                        if(results.length==0){
                            res.json({
                                message: "There is none student in this course yet!!!" 
                            })
                            .status(400)
                        }else{
                            // console.log(results)
                            res.json({
                                results: results
                            })
                            .status(200)
                        }
                    })
                }else{
                    // console.log(results)
                    res.json({
                        results: results
                    })
                    .status(200)
                }
            })
        }
        else{
            // console.log(results)
            res.json({
                results: results
            })
            .status(200)
        }
    })
}

exports.detail = async function detail (req,res){
    const token = req.cookies.access_token
    const verified = jwt.verify(token,config.authentication.jwtSecret);
    // console.log(verified.id)
    connection.query('SELECT * FROM course c JOIN year y ON c.year_id = y.year_id JOIN teacher t ON t.id = c.teacher_id WHERE course_id = ? AND '  + 
    'teacher_id = ?' ,
    [req.body.course_id,verified.id],
    (error,results)=>{
        if(error) throw error
        if(results.length==0){
            res.json({
                message: "error!!!" 
            })
            .status(400)
        }
        else{
            res.json({
                results: results
            })
            .status(200)
        }
    })
}