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

// Student submit assignment
exports.submitted = async function submitted (req,res) {
    const date = req.body.date
    const token = req.cookies.access_token
    const verified = jwt.verify(token,config.authentication.jwtSecret);
    connection.query('UPDATE submission SET _submitDate = ? WHERE student_id = ? AND assignment_id = ?',[date,verified.id,req.body.assignment_id])
    connection.query('UPDATE submission SET _submitFile = ? WHERE student_id = ? AND assignment_id = ?',[req.body.file,verified.id,req.body.assignment_id])
    connection.query('UPDATE submission SET  _status = ? WHERE student_id = ? AND assignment_id = ?', ['done',verified.id,req.body.assignment_id],async (error,results)=> {
      if (error) throw error;
      else{
        res.status(200)
           .json({
              message : "submit successfully!!!"
          })
        }
      })
    }
// Student view all assignments
exports.viewAll = async function viewAll (req,res) {
  const token = req.cookies.access_token
  const verified = jwt.verify(token,config.authentication.jwtSecret);
  connection.query('SELECT * FROM submission s JOIN assignments a ON s.assignment_id = a._id WHERE s.student_id = ?',
   [verified.id],async (error,results)=> {
    if (error) throw error;
    else{
      res.status(200)
         .json({
            result: results
        })
      }
    })
}


// Student view all assignments that haven't done
exports.view = async function view (req,res) {
  const token = req.cookies.access_token
  const verified = jwt.verify(token,config.authentication.jwtSecret);
  connection.query('SELECT * FROM submission s JOIN assignments a ON s.assignment_id = a._id WHERE s.student_id = ? AND s._status = ?',
   [verified.id,'not yet'],async (error,results)=> {
    if (error) throw error;
    else{
      res.status(200)
         .json({
            result: results
        })
      }
    })
}

exports.detail = async function detail (req,res){
  connection.query('SELECT * FROM assignments WHERE _id = ?',[req.body.assignment_id],(error,results)=> {
    if (error) throw error;
    else{
      res.status(200)
         .json({
            result: results
        })
      }
  })
}