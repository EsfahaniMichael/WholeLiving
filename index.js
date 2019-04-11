const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 9000;
const ENV = process.env.NODE_ENV || 'development';


const app = express();

app.use(cors());

// app.use((req, res, next) => {
//     //call db for user info

//     req.user = {
//         name:'MIchael',
//         occupation: 'janitor'  
//     }

//     next();
// })

app.get('/api/test', (req, res) => {

    res.send(`<h1>API Status</h1>`)
});

// app.get('/api/get-user', (req, res) => {
//     res.send(req.user);
// })

app.listen(PORT, () => {
    console.log('Server Running at localhost:', + PORT);
}).on('error', (err => {
    console.log("Server listen error, you probably already have a server on PORT:" + PORT);
}))