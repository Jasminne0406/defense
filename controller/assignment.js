const mysql = require('mysql');
const bcrypt = require('bcrypt');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456789',
  database: 'db'
});

exports.display = async function display (req,res) {
  connection.query('SELECT * FROM assignments WHERE _course_id = ?',[req.params.id],async (error,results)=>{
    if (error) throw error;
    else{
      res.status(200)
         .json({
            results: results
        })
    }
  })
}
