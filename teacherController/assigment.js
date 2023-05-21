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
//Teacher create assigments
exports.create = async function create (req,res) {
            var fileBuffer = Buffer.from(req.body.file, 'base64')
            const value = [
                [req.body.title,req.body.desc,req.body.course_id,req.body.assignOn,req.body.dateline,req.body.dueTime,req.body.group,req.body.score,fileBuffer]
            ]
            connection.query('INSERT INTO assignments (_title,_desc,_course_id,_assignOn,_dateline,_dueTime,_group,_score,_file) VALUES ?',[value])
            connection.query('SELECT _id FROM assignments WHERE _file = ?',[fileBuffer], async (error,results) => {
                let assigment_id = results[0]._id;
                connection.query('SELECT year_id FROM course WHERE course_id = ?',[req.body.course_id], async (error,results) => {
                    if (error) throw error;
                    let year_id = results[0].year_id;
                    // console.log(year_id)
                    // console.log(assigment_id)
                    if (req.body.group==='all' || req.body.group===null){
                        connection.query('SELECT student_id FROM student_yg syg JOIN yg ON syg.yg_id = yg.yg_id WHERE yg.year_id = ?',[year_id], async (error,results) => {
                            for(i=0; i<results.length ; i++){
                                let value = [
                                    [results[i].student_id,assigment_id,'N/A','N/A',0,fileBuffer,'N/A']
                                ]
                                connection.query('INSERT INTO submission (student_id,assignment_id,_submitDate,_submitTime,_score,_file,_submitFile) VALUES ? ',[value])
                            }
                        })
                    }else{
                        connection.query('SELECT student_id FROM student_yg syg JOIN yg ON syg.yg_id = yg.yg_id WHERE yg.yg_id = ?',
                        [year_id+req.body.group], async (error,results) => {
                            for(i=0; i<results.length ; i++){
                                let value = [
                                    [results[i].student_id,assigment_id,req.body.file]
                                ]
                                connection.query('INSERT INTO submission (student_id,assignment_id,_file) VALUES ? ',[value])
                            }
                        })
                    } 
                })
            })
            res .status(200)
                .json({
                    message : "Assignment creates successfully!!!"
                 })
        }

// Teacher score assignments
exports.score = async function score (req,res) {
    connection.query('UPDATE submission SET _score = ? WHERE student_id = ? AND assignment_id = ?',[req.body.score,req.body.student_id,req.body.assignment_id]);
    res
        .status(200)
        .json({
             message: "Assignment score successfully!"
        })
}

// Teacher view into each student assignment detail 
exports.detail = async function detail (req,res) {
    let student = {
        id : req.body.id,
        name : null,
        _group : null,
        _fullscore : null,
        _getscore: 0,
        _assignfile : null,
        _dateline : null,
        _submitdate : null,
        _submitfile : null,
        _status :  null
    }  
   connection.query('SELECT name FROM student WHERE id = ?',[req.body.id],(error,results)=>{
     student.name = results[0].name;
     connection.query('SELECT _group, _score, _file, _dateline FROM assignments WHERE _id = ?',[req.body.assignment_id],(error,results)=>{
        student._group = results[0]._group;
        student._fullscore = results[0]._score;
        student._assignfile = results[0]._file;
        student._dateline = results[0]._dateline
        connection.query('SELECT * FROM submission WHERE student_id = ? AND assignment_id = ?',[req.body.id,req.body.assignment_id],(error,results)=>{
            student._getscore = results[0]._score;
            student._submitdate = results[0]._submitDate;
            student._submitfile = results[0]._submitFile;
            student._status = results[0]._status;
            res
                .status(200)
                .json({results : student})
        })
     })
   })
}
// Teacher update assignments
exports.update = async function update (req,res) {
    connection.query("UPDATE assignments SET _title = ? WHERE _title = ? AND _desc = ? AND _dateline = ? AND _group = ? AND _score = ? AND _assignOn = ? AND _file = ?",
    [req.body.new_title, req.body.old_title,req.body.old_desc,req.body.old_dateline,req.body.old_group,req.body.old_score,req.body.assignOn,req.body.old_file])

    connection.query("UPDATE assignments SET _desc = ? WHERE _title = ? AND _desc = ? AND _dateline = ? AND _group = ? AND _score = ? AND _assignOn = ? AND _file = ?",
    [req.body.new_desc, req.body.new_title,req.body.old_desc,req.body.old_dateline,req.body.old_group,req.body.old_score,req.body.assignOn,req.body.old_file])

    connection.query("UPDATE assignments SET _dateline = ? WHERE _title = ? AND _desc = ? AND _dateline = ? AND _group = ? AND _score = ? AND _assignOn = ? AND _file = ?",
    [req.body.new_dateline, req.body.new_title,req.body.new_desc,req.body.old_dateline,req.body.old_group,req.body.old_score,req.body.assignOn,req.body.old_file])

    connection.query("UPDATE assignments SET _group = ? WHERE _title = ? AND _desc = ? AND _dateline = ? AND _group = ? AND _score = ? AND _assignOn = ? AND _file = ?",
    [req.body.new_group, req.body.new_title,req.body.new_desc,req.body.new_dateline,req.body.old_group,req.body.old_score,req.body.assignOn,req.body.old_file])

    connection.query("UPDATE assignments SET _score = ? WHERE _title = ? AND _desc = ? AND _dateline = ? AND _group = ? AND _score = ? AND _assignOn = ? AND _file = ?",
    [req.body.new_score, req.body.new_title,req.body.new_desc,req.body.new_dateline,req.body.new_group,req.body.old_score,req.body.assignOn,req.body.old_file])

    connection.query("UPDATE assignments SET _file = ? WHERE _title = ? AND _desc = ? AND _dateline = ? AND _group = ? AND _score = ? AND _assignOn = ? AND _file = ?",
    [req.body.new_file, req.body.new_title,req.body.new_desc,req.body.new_dateline,req.body.new_group,req.body.new_score,req.body.assignOn,req.body.old_file], (error,results)=>{
        if(error) throw error
        else {
            res .status(200)
                .json({
                    message : "Assignment updates successfully!!!"
                })
            }
    })
}


// Teacher delete assignment
exports._delete = async function _delete (req,res) {
    connection.query("DELETE FROM assignments WHERE _id = ?",[req.body.assigment_id])
    connection.query("DELETE FROM submission WHERE assignment_id = ?",[req.body.assigment_id]) 
    res .status(200)
        .json({
            message : "Assignment updates successfully!!!"
        })
    }

exports.view = async function view (req,res) {
    connection.query("SELECT * FROM assignments WHERE _course_id = ?",[req.body.course_id],(error,results)=>{
    // console.log(results)
    res
        .status(200)
        .json({
            results: results
        })
    })
}

exports.viewDetail = async function viewDetail (req,res) {
    connection.query("SELECT * FROM assignments WHERE _course_id = ? AND _id = ?",[req.body.course_id,req.body.assigment_id],(error,results)=>{
    // console.log(results)
    res
        .status(200)
        .json({
            results: results
        })
    })
}

exports.viewByGroup = async function view (req,res) {
    connection.query("SELECT * FROM assignments WHERE _course_id = ? AND _group = ?",[req.body.course_id,req.body.group],(error,results)=>{
    // console.log(results)
    res
        .status(200)
        .json({
            results: results
        })
    })
}

exports.viewAll = async function viewAll (req,res) {
    connection.query("SELECT id,name,_score,_status FROM student stu JOIN submission sub ON sub.student_id = stu.id WHERE sub.assignment_id = ?",[req.body.assignment_id],(error,results)=>{
        res
            .status(200)
            .json({
                results: results
            })
        })
}

