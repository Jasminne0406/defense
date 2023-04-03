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

exports.attended = async function attended (req,res) {
  const token = req.cookies.access_token
  const verified = jwt.verify(token,config.authentication.jwtSecret);
    connection.query('UPDATE attendance SET time = ? WHERE student_id = ?', [req.body.time,verified.id],async (error,results)=> {
      if (error) throw error;
      else{
        res.status(200)
           .json({
              message : "student " + verified.id + " attend class at " + req.body.time
          })
        }
      })
    }


