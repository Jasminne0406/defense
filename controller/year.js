const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456789',
  database: 'db'
});
exports.create = async function create (req,res) {
    const year_id = 'Y_'+req.body.year+(req.body.FromYear).slice(-2)+(req.body.ToYear).slice(-2);
    const yg_id = 'Y_'+req.body.year+(req.body.FromYear).slice(-2)+(req.body.ToYear).slice(-2)+req.body.group;
    const value2 = [
            [ yg_id,year_id,req.body.group]
        ]
    connection.query('SELECT * FROM year WHERE year_id = ?',year_id, async (error,results) => {
        if (error) throw error;
        const ArrayData = results.map(result => Object.values(result));
        if(ArrayData[0]==null){
            const value1 = [
                [ year_id,req.body.year,req.body.FromYear,req.body.ToYear]
            ]
            const yg = connection.query('SELECT yg_id FROM yg WHERE yg_id = ?',yg_id);
            if(yg.server==null){
                connection.query('INSERT INTO year (year_id,year,FromYear,ToYear) VALUES ?',[value1])
                connection.query('INSERT INTO yg (yg_id,year_id,group_name) VALUES ?',[value2])
                res.send("Year and Group create successfully!");
            }
            else{
                res.send("Group ID already exist!")
            }
        }else{
            const yg = connection.query('SELECT yg_id FROM yg WHERE yg_id = ?',yg_id);
            if(yg.server==null){
                connection.query('INSERT INTO yg (yg_id,year_id,group_name) VALUES ?',[value2])
                res.send("Year and Group creates successfully!");
            }
        }
    })
};

exports.displayAll = async function displayAll (req,res) {
    connection.query('SELECT * FROM year',async (error,results)=>{
        if (error) throw error;
        else{
            res.send(results)
        }
    })
}

exports.deleteByID = async function deleteByID (req,res) {
    connection.query('DELETE FROM year WHERE year_id = ? ',[req.params.id],async (error,results)=>{
        if (error) throw error;
        else{
            res.status(200).json({
                results : "Delete Successfully!"
            })
        }
    })
}

