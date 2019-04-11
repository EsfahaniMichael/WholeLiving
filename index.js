const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 9000;
const ENV = process.env.NODE_ENV || 'development';


const app = express();

app.use(cors());

app.get('/api/test', (req, res) => {

    res.send('<h1>API Status</h1>')
});

app.listen(PORT, () => {
    console.log('Server Running at localhost:', + PORT);
}).on('error', (err => {
    console.log("Server listen error, you probably already have a server on PORT:" + PORT);
}))