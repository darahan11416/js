const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');


const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root@123',
    database: 'crud_db'
});

db.connect((err) =>{
if(err) throw err;
console.log("db connect");
});


app.post('/users' ,(req,res) =>{
    const {name ,email} = req.body;
    const sql = 'insert into users(name,email) values(?,?)';
    db.query(sql, [name,email],(err,result) =>{
        if(err) throw err;  
        res.send({id:result.insertId,name,email});
    });


});

app.delete('/users/:id' ,(req,res) =>{

    const {id} = req.params;
    const sql = 'delete from users where id=?';
    db.query(sql , [id],(err,result) =>{
        if(err) throw err;
        res.send({message:"user deleted"});

    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

