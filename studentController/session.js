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

exports.displayAll = async function displayAll (req,res) {
    connection.query('SELECT * FROM _sessions WHERE course_id = ?',[req.body.course_id],(error,results) => {
        res
            .status(200)
            .json({
                results: results
            })
    })
}

exports.detail = async function detail (req,res){
    const token = req.cookies.access_token
    const verified = jwt.verify(token,config.authentication.jwtSecret);
    connection.query('SELECT * FROM attendance a JOIN _session s ON a.session_id = s.id WHERE a.student_id = ? AND a.session_id = ?',[verified.id,req.body.session_id],(error,results) => {
        res
            .status(200)
            .json({
                results: results
            })
    })
}