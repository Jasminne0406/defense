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

exports.signUp = async function signUp (req,res) {
    const salt = await bcrypt.genSalt(10);
    const password = req.body.password;
    password2 = await bcrypt.hash(password, salt);
    const value1 = [
        [ req.body.id,req.body.name,req.body.gender,req.body.address,req.body.email,req.body.phone,password2]
    ]
    connection.query('SELECT * FROM student WHERE id = ?',req.body.id, async (error,results) => {
        if (error) throw error;
        const ArrayData = results.map(result => Object.values(result));
        connection.query('SELECT * FROM student WHERE email = ?',req.body.email, async (error,results)=>{
            if (error) throw error;
            const checkEmail = results.map(result => Object.values(result));
            if(ArrayData[0]==null){
                if(checkEmail[0]==null){
                    connection.query('INSERT INTO student (id,name,gender,address,email,phone,password) VALUES ?',[value1]);
                    connection.query('SELECT year_id FROM year WHERE year = ? AND FromYear = ? AND ToYear = ?', [req.body.Year,req.body.FromYear,req.body.ToYear], async (error,results)=>{
                    const yg_id = results[0].year_id+req.body.group;
                    // console.log(results[0].year_id)
                    const value2 = [
                        [ req.body.id,yg_id]
                    ]
                    connection.query('INSERT INTO student_yg (student_id,yg_id) VALUES ?',[value2]);
                    res.send("Add successfully!");
                    })
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
    const status = "active"
    connection.query('SELECT * FROM student WHERE id = ?',[req.body.new_id], async (error,results)=>{
        if(error) throw error;
        // console.log(results[0])
        if(results[0]==!'undefined'){
            res.json({
                message: "The Id already exist! Please input new ID!" 
                 })
                .status(400)
                }
                else{
                    connection.query('UPDATE teacher SET id = ? WHERE id = ?',[req.body.new_id,req.body.old_id]);
                    connection.query('UPDATE student SET name = ? WHERE id = ? AND status = ?',[req.body.name,req.body.new_id,status]);
                    connection.query('UPDATE student SET address = ? WHERE id = ? AND status = ?',[req.body.address,req.body.new_id,status]);
                    connection.query('UPDATE student SET email = ? WHERE id = ? AND status = ?',[req.body.email,req.body.new_id,status]);
                    connection.query('UPDATE student SET phone = ? WHERE id = ? AND status = ?',[req.body.phone,req.body.new_id,status]);
                    connection.query('UPDATE student_yg SET yg_id = ? WHERE student_id = ? AND status = ?',[req.body.yg_id,req.body.new_id,status],(error)=>{
                        if(error) throw error;
                        else{
                            res.json({
                                message: "Student Update Successfully!" 
                            })
                            .status(400)
                        }
                    });
                }
            })
        }

exports.updateClass = async function updateClass (req,res) {
    const status = "active"
    const year_id = 'Y_'+req.body.year+(req.body.FromYear).slice(-2)+(req.body.ToYear).slice(-2);
    const new_year_id = 'Y_'+(req.body.year+1)+(req.body.FromYear+1).slice(-2)+(req.body.ToYear+1).slice(-2);
    connection.query('SELECT * FROM yg WHERE year_id = ?',[year_id],(error,results)=>{
        if (error) throw error;
        else{
            for(i=0 ; i<results.length ; i++){
                connection.query('UPDATE student_yg SET yg_id = ? WHERE yg_id = ?', [new_year_id+results[i].group_name, year_id+results[i].group_name]);
            }
            // console.log(results.length)
            res.send("update successfully!!!")
        }
    });
}

exports._delete = async function _delete (req,res) {
    connection.query('DELETE FROM student WHERE student_id = ?',[req.params.id], async (error,results)=>{
        if (error) throw error;
        connection.query('DELETE FROM student_yg WHERE student_id = ? )',[req.params.id]);
        res.json({
            message: "Student Delete Successfully!!!"
        })
    });
}

exports.searchOneStudent = async function searchOneStudent (req,res) {
    connection.query('SELECT * FROM student s JOIN student_yg yg ON s.id = yg.student_id JOIN yg g ON yg.yg_id = g.yg_id JOIN year y ON g.year_id = y.year_id'+
    ' WHERE id = ? OR name = ? OR group_name = ? OR year = ? OR FromYear = ? OR ToYear = ?',
    [req.params.search,req.params.search,req.params.search,req.params.search,req.params.search,req.params.search
    ,req.params.search],
    async (error,results)=>{
        if (error) throw error;
        if(results.length==0){
            res.send("Do not have any data related to what you're searching !!!")
        }else{
            res.send(results)
        }
    })
}

exports.displayAll = async function displayAll (req,res) {
    connection.query('SELECT * FROM student s JOIN student_yg yg ON s.id = yg.student_id JOIN yg g ON yg.yg_id = g.yg_id JOIN year y ON g.year_id = y.year_id',async (error,results)=>{
        if (error) throw error;
        res.status(200).json({
            results : results
        })

    })
}

//search student by year and group
exports.searchByYearGroup = async function searchByYearGroup (req,res) {
    if(req.body.group_name=='All'){
        connection.query('SELECT * FROM student s JOIN student_yg yg ON s.id = yg.student_id JOIN yg g ON yg.yg_id = g.yg_id JOIN year y ON g.year_id = y.year_id'+
        ' WHERE year = ? AND FromYear = ? AND ToYear = ?',[req.body.year,req.body.FromYear,req.body.ToYear],async (error,results)=>{
            if (error) throw error;
            if(results.length==0){
                res.send("Do not have any data related to what you're searching !!!")
            }else{
                res.send(results)
            }
        })
    }else{
        connection.query('SELECT * FROM student s JOIN student_yg yg ON s.id = yg.student_id JOIN yg g ON yg.yg_id = g.yg_id JOIN year y ON g.year_id = y.year_id'+
        ' WHERE group_name = ? AND year = ? AND FromYear = ? AND ToYear = ?',[req.body.group, req.body.year,req.body.FromYear,req.body.ToYear],
        async (error,results)=>{
            if (error) throw error;
            if(results.length==0){
                res.send("Do not have any data related to what you're searching !!!")
            }else{
                res.send(results)
            }
        })
    }
}


