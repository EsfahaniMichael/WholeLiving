const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const db = require('./db');
const PORT = process.env.PORT || 9000;
const ENV = process.env.NODE_ENV || 'development';
const parse = require('csv-parse');
const fs = require('fs');
const stream = require('stream');



const app = express();

app.use(cors());
app.use(express.json());

///Code commented out is what populates the DB for "location" with all the Whole Food's info needed


// const parser = parse({
//     delimiter:','
// })

// parser.on('readable', function(){
//     let record;
//     while (record = parser.read()) {
//         try{
//             var sql = 'INSERT INTO `location` (lng, lat, address, city, state, zip, phonenumber, hours) VALUES (?,?,?,?,?,?,?,?)';
//             const query = mysql.format(sql, record);

//             db.query(query);
//         }catch(error){
//             console.log(error)
//         }
//     }
// })

// const readData = fs.createReadStream('./wholefoodsList.csv').pipe(parser);

 const results = [];

// fs.createReadStream('./wholefoodsList.csv')
//     .pipe(parse())
//     .on('data', (data) => results.push(data))
//     .on('end', () => {
//         console.log(results);
//     });


app.get('/api/location', async (req, res, next) =>{
    const sql = 'SELECT * FROM `location`'
    let wholeFoodsLocations = await db.query(sql);
    // console.log("YOOO", wholeFoodsLocations)

    // wholeFoodsLocations = wholeFoodsLocations.map(item => {
    //     item.foodData = {
            
    //     }
    // })
    
    // res.send({
    //     success: true,
    //     wholeFoodsLocations: wholeFoodsLocations
    // })

    wholeFoodsLocations = wholeFoodsLocations.map(item => {
        // console.log(item);
        item.type = "Feature",
            item.geometry = {
                type:"Point",
                coordinates:[item.lng, item.lat]
            };
        item.properties = {
            Address: item['address'],
            "City": item['city'],
            "State": item['state'],
            "Zip":item.zip,
            Phone: item.phone,
            "Hours": item['hours'],
        }

        delete item.lng;
        delete item.lat;
        delete item.address;
        delete item.city;
        delete item.state;
        delete item.zip;
        delete item.phone;
        delete item.hours;
        return item;
    });

    app.get('/api/states', async (req, res, next) => {
        const sql = 'SELECT * FROM `location`'
        let states = await db.query(sql);
        console.log('YOU GOT ME!!');

    })

    res.send({
        success:true,
        geoJson: {
            type:"FeatureCollection",
            features: wholeFoodsLocations
        }
    });
})


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
        if(name.length < 3){
            throw new Error("Your name sucks!!")
        }

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