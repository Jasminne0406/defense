const mysql = require('mysql');
const bcrypt = require('bcrypt');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456789',
  database: 'db'
});

exports.create = async function create(req,res){ 
    const value = [
        [req.body.name,req.body.start,req.body.end,req.body.date,req.body.group,req.body.course_id,req.body.desc]
    ]
    console.log(req.body.course_id)
    connection.query('INSERT INTO _sessions (_name,_start,_end,_date,_group,course_id,description) VALUES ?',[value])
    connection.query('SELECT year_id FROM course WHERE course_id = ?',[req.body.course_id], async (error,results) => {  
            if (error) throw error;
            let year_id = results[0].year_id;
            // console.log(year_id)
            if (req.body.group==='all' || req.body.group===null){
                connection.query('SELECT id FROM _sessions WHERE _name = ? AND _start = ? AND _end = ? AND _date = ? AND _group = ? AND course_id = ?',
                    [req.body.name,req.body.start,req.body.end,req.body.date,req.body.group,req.body.course_id], 
                    async (error,results) => {
                        let session_id = results[0].id;
                        connection.query('SELECT student_id FROM student_yg syg JOIN yg ON syg.yg_id = yg.yg_id WHERE yg.year_id = ?',[year_id], async (error,results) => {
                        for(i=0; i<results.length ; i++){
                            let value = [
                                [results[i].student_id,session_id]
                            ]
                            connection.query('INSERT INTO attendance (student_id,session_id) VALUES ? ',[value])
                        }
                    })
                })
                }else{
                    connection.query('SELECT id FROM _sessions WHERE _name = ? AND _start = ? AND _end = ? AND _date = ? AND _group = ? AND course_id = ?',
                    [req.body.name,req.body.start,req.body.end,req.body.date,req.body.group,req.body.course_id], 
                    async (error,results) => {
                        let session_id = results[0].id;
                            connection.query('SELECT student_id FROM student_yg syg JOIN yg ON syg.yg_id = yg.yg_id WHERE yg.yg_id = ?',
                            [year_id+req.body.group], async (error,results) => {
                            for(i=0; i<results.length ; i++){
                                let value = [
                                    [results[i].student_id,session_id]
                                ]
                                connection.query('INSERT INTO attendance (student_id,session_id) VALUES ? ',[value])
                            }
                        })
                    })
                }
                res.json({
                    message: "session creates successfully!!"
                })
            })
        }

exports.attendance = async function attendance (req,res) {
    connection.query('UPDATE attendance SET attend = ? AND time = ? WHERE student_id = ? AND session_id = ?', ['true',req.body.time,req.body.student_id,req.body.session_id],async (error,results)=> {
      if (error) throw error;
      })
    }

exports.displayByGroup = async function displayByGroup (req,res) {
    connection.query('SELECT * FROM _sessions s JOIN course c ON s.course_id = c.course_id JOIN teacher t ON c.teacher_id = t.id WHERE c.course_id = ? AND s._group = ?',[req.body.course_id,req.body.group],(error,results) => {
        // console.log(results)
        res 
            .status(200)
            .json({
                results: results
            })
    })
}

exports.displayAll = async function displayAll (req,res) {
    connection.query('SELECT * FROM _sessions s JOIN course c ON s.course_id = c.course_id JOIN teacher t ON c.teacher_id = t.id WHERE c.course_id = ?',[req.body.course_id],(error,results) => {
        // console.log(results)
        res 
            .status(200)
            .json({
                results: results
            })
    })
}

exports.detail = async function detail (req,res) {
    connection.query('SELECT * FROM _sessions WHERE id = ?',[req.body.id],(error,results) => {
        res
            .status(200)
            .json({
                results: results
            })
    })
}