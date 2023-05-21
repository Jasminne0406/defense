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
    const token = req.cookies.access_token;
    const verified = jwt.verify(token,config.authentication.jwtSecret);
    connection.query('SELECT year_id FROM yg JOIN student_yg stu ON yg.yg_id = stu.yg_id WHERE stu.student_id = ?',[verified.id],(error,results)=>{
        const year_id = results[0].year_id;
            connection.query('SELECT * FROM course c JOIN teacher t ON c.teacher_id = t.id JOIN year y ON y.year_id = c.year_id WHERE c.year_id = ?',year_id,(error,results)=>{
                res .status(200)
                    .json({
                        results: results
                    })
            })
    })
}