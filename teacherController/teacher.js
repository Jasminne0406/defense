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

exports.logined = async function logined (req,res){
    const token = req.cookies.access_token
    const verified = jwt.verify(token,config.authentication.jwtSecret);
    console.log(verified.id)
    connection.query('SELECT * FROM course c JOIN year y ON c.year_id = y.year_id WHERE teacher_id = ?',[verified.id],(error,results)=>{
    res
        .status(200)
        .json({
            results : results
        })
    })
}