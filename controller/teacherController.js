const mysql = require('mysql');
const bcrypt = require('bcrypt');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456789',
  database: 'db'
});
exports.signUp = async function signUp (req,res) {
    const salt = await bcrypt.genSalt(10);
    const password = req.body.password;
    password2 = await bcrypt.hash(password, salt);
    const value = [
        [ req.body.id,req.body.name,req.body.gender,req.body.address,req.body.email,req.body.phone,password2]
    ]
    connection.query('SELECT * FROM teacher WHERE id = ?',req.body.id, async (error,results) => {
        if (error) throw error;
        const ArrayData = results.map(result => Object.values(result));
        connection.query('SELECT * FROM teacher WHERE email = ?',req.body.email, async(error,results)=>{
            if (error) throw error;
            let checkEmail = results.map(result => Object.values(result));
            if(ArrayData[0]==null){
                if(checkEmail[0]==null){
                    connection.query('INSERT INTO teacher (id,name,gender,address,email,phone,password) VALUES ?',[value]);
                    res.send("Add successfully!");
                }
                else{
                    res.send("Email already exist!") 
                }
            }else{
                res.send("ID already exist!")
            }
        })
    })
};

exports.update = async function update (req,res) {
    connection.query('SELECT * FROM teacher WHERE id = ?',[req.body.new_id], async (error,results)=>{
        if(error) throw error;
        // console.log(results[0])
        if(results[0]==!'undefined'){
            res.json({
                message: "The Id already exist! Please input new ID!" 
                 })
                .status(400)
        }else{
            connection.query('UPDATE teacher SET id = ? WHERE id = ?',[req.body.new_id,req.body.old_id]);
            connection.query('UPDATE teacher SET name = ? WHERE id = ?',[req.body.name,req.body.new_id]);
            connection.query('UPDATE teacher SET address = ? WHERE id = ?',[req.body.address,req.body.new_id]);
            connection.query('UPDATE teacher SET email = ? WHERE id = ?',[req.body.email,req.body.new_id]);
            connection.query('UPDATE teacher SET phone = ? WHERE id = ?',[req.body.phone,req.body.new_id]);
            connection.query('UPDATE course SET teacher_id = ? WHERE teacher_id = ?',[req.body.new_id,req.body.old_id],(error,results)=>{
                res.json({
                    message: "Teacher Update Successfully!" 
                     })
                    .status(200)
            })
        }
    });
};

exports.resign = async function resign (req,res) {
    connection.query('DELETE FROM teacher WHERE id = ?',req.params.id,(error,results) => {
        if(error) throw error;
        else{
            connection.query('DELETE FROM course WHERE id = ?',req.params.id);
            res.send("Delete successfully!!!")
        }
    });
};

exports.displayAll = async function displayAll (req,res) {
    connection.query('SELECT * FROM teacher',(error,results) => {
        if(error) throw error;
        else{
            res.send(results)
        }
    })
}

exports.seeDetail = async function seeDetail (req,res) {
    connection.query ('SELECT * FROM teacher t JOIN course c ON t.id = c.teacher_id JOIN year y ON c.year_id = y.year_id WHERE id = ?',[req.params.id],(error,results)=>{
        if(error) throw error;
        let teacher = {
            id : results[0].id,
            name : results[0].name,
            address : results[0].address,
            email: results[0].email,
            phone: results[0].phone,
            course: new Array(results.length),
            ToYear: new Array(results.length),
            FromYear: new Array(results.length),
            year: new Array(results.length)
        }
        for (i=0 ; i<results.length ; i++){
            teacher.course[i] = results[i].course_name;
            teacher.ToYear[i] = results[i].ToYear;
            teacher.FromYear[i] = results[i].FromYear;
            teacher.year[i] = results[i].year
        }
        // console.log(teacher);
        res.send(teacher)
    })
}

exports.searchOne = async function searchOne (req,res) {
    connection.query('SELECT * FROM teacher WHERE id = ? OR name = ? OR address = ? OR phone = ? OR email = ?',
    [req.params.search,req.params.search,req.params.search,req.params.search,req.params.search],
    async (error,results)=>{
        if (error) throw error;
        if(results.length==0){
            res.send("Do not have any data related to what you're searching !!!")
        }else{
            res.send(results)
        }
    })
}



