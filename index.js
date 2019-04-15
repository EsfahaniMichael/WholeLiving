const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const db = require('./db');
const PORT = process.env.PORT || 9000;
const ENV = process.env.NODE_ENV || 'development';


const app = express();

app.use(cors());
app.use(express.json());


app.get('/api/test', (req, res) => {

    res.send({
        success: true,
        message: 'API up and running without issue'
    })
});

app.post('/api/test', (req, res) => {
    console.log('POST DATA:', req.body);

    res.send({
        success: true,
        postDataRecieved: req.body,
        message: 'API post test working'
    })
})


app.listen(PORT, () => {
    console.log('Server Running at localhost:', + PORT);
}).on('error', (err => {
    console.log("Server listen error, you probably already have a server on PORT:" + PORT);
}))