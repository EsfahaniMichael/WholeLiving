const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const db = require('./db');
const PORT = process.env.PORT || 9000;
const ENV = process.env.NODE_ENV || 'development';


const app = express();

app.use(cors());
app.use(express.json());


app.get('/api/test', async (req, res) => {

    const sql = 'SELECT * FROM `test`';

    const users = await db.query(sql);

    res.send({
        success: true,
        users: users
    })

    
});

app.post('/api/test', async (req, res) => {
   const { name, email, phone } = req.body;

    try {
        const sql = 'INSERT INTO `test` (name, email, phone) VALUES (?, ?, ?)';
        const inserts = [name, email, phone];
     
        const query = mysql.format(sql, inserts);
     
        const insertResults = await db.query(query);  
     
        res.send({
            success: true,
            insertId: insertResults.insertId
        })
    } catch(err){
        res.status(500).send('Server Error');
    }   


})


app.listen(PORT, () => {
    console.log('Server Running at localhost:', + PORT);
}).on('error', (err => {
    console.log("Server listen error, you probably already have a server on PORT:" + PORT);
}))