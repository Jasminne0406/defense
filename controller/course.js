const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456789',
  database: 'db'
});

exports.create = async function create (req,res) {
    connection.query('SELECT * FROM course WHERE course_id = ?',req.body.course_id, async (error,results) => {
        if (error) throw error;
        const ArrayData = results.map(result => Object.values(result));
        if(ArrayData[0]==null){
            // connection.query('SELECT year_id FROM year WHERE year = ? AND FromYear = ? AND ToYear = ?',[[req.body.year],[req.body.FromYear],[req.body.ToYear]],
            // async (error,results) => {
            //     if (error) throw error;
            //     const year_Id = results.map(result => Object.values(result));
            //     const yearId = year_Id[0][0];
            //     const year_id = 'Y_'+req.body.year+(req.body.FromYear).slice(-2)+(req.body.ToYear).slice(-2);
            //     if(yearId == null){
            //         const value2 = [
            //             [ year_id,req.body.year,req.body.FromYear,req.body.ToYear]
            //         ]
            //         connection.query('INSERT INTO year (year_id,year,FromYear,ToYear) VALUES ?',[value2]); // if year has not create yet
            //     }
                const value = [
                    [ req.body.course_id,req.body.teacher_id,req.body.course_name,req.body.year_id]
                ]
                connection.query('INSERT INTO course (course_id,teacher_id,course_name,year_id) VALUES ?',[value],(error)=>{
                    res
                    .status(200)
                    .json({
                        message: "Insert successfully 😊 👌",
                    })
                });
            }
        })
}
       
exports.deleteByID = async function deleteByID (req,res){
    connection.query('DELETE FROM course WHERE course_id = ?',[req.parmas.id],(error,results)=>{
        if(error) throw error
        if(results.length){
            res
                    .status(404)
                    .json({
                        message: "Can't Find the course!!!",
                    })
        }
        else{
            res
                    .status(200)
                    .json({
                        message: "Course Delete successfully 😊 👌",
                    })
        }
    })
}

exports.search = async function search (req,res){
    connection.query('SELECT * FROM course c JOIN year y ON c.year_id = y.year_id WHERE course_id = ? OR' + 
    'teacher_id = ? OR course_name = ? OR year = ? OR FromYear = ? OR ToYear = ?',
    [req.parmas.search,req.parmas.search,req.parmas.search,req.parmas.search,req.parmas.search,req.parmas.search],
    (error,results)=>{
        if(error) throw error
        if(results.length){
            res.send("Can Find The Course !!!")
        }
        else{
            res.send(results)
        }
    })
}

exports.update = async function update (req,res) {
    connection.query('UPDATE course SET course_name = ? AND teacher_id = ? AND year_id = ? WHERE course_id = ?',
    [req.body.course_name,req.body.teacher_id,req.body.year_id,req.parmas.id],(error,results) => {
        if(error) throw error
        if(results.length){
            res.send("Can Find The Course !!!")
        }
        else{
            res.send("Update Successfully !!!")
        }
    })
}

