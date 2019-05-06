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
app.get("/api/getGooglePlacesData", function (req, res){
    const sql = 'SELECT * FROM `location`'
    let wholeFoodsLocations = await db.query(sql);
    console.log("YOOO", wholeFoodsLocations)
    
    res.send({
        success: true,
        wholeFoodsLocations: wholeFoodsLocations
    })
})


// app.get("/api/getGooglePlacesData", function (req, res) {
//     console.log('HELLLOOOO!!')
//     var geospatialSearchQuery = 'SELECT *,3956*2*ASIN(SQRT(POWER(SIN((? - ABS(location.geometry__location__lat))*PI()/180/2),2) + COS(?*PI()/180)*COS(ABS(location.geometry__location__lat)*PI()/180)*POWER(SIN((? - location.geometry__location__lng)*PI()/180/2),2))) AS distance FROM location HAVING distance < 10000 ORDER BY distance limit 10;'
//     var city = req.query.city;
//     var gymType = req.query.gymType;
//     var location = null;
//     var urlForGeocodingAPI = `https://maps.googleapis.com/maps/api/geocode/json?city=${city}&key="AIzaSyAa4PHfimwI9t7H49K6IIJylg1p_m4vGHg"`;
//     var urlForGooglePlacesAPI = null;
//     var searchResult = [];
//     var dataToSend = {};
//     dataToSend.mapCenter = null;
//     dataToSend.places = [];
//     //get nearby key places
//     const getDataFromGooglePlaces = async () => {
//         try {
//             urlForGooglePlacesAPI = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${gymType.split(" ").join("+")}&location=${location.lat},${location.lng}&radius=10000&key="AIzaSyAa4PHfimwI9t7H49K6IIJylg1p_m4vGHg"`;
//             const response = await axios.get(urlForGooglePlacesAPI);
//             if (response.statusText === "OK") {
//                 searchResult = response.data.results;
//                 for (let i = 0; i < searchResult.length; i++) {
//                     dataToSend.places.push({
//                         "formatted_address": searchResult[i].formatted_address,
//                         "geometry__location__lat": searchResult[i].geometry.location.lat,
//                         "geometry__location__lng": searchResult[i].geometry.location.lng,
//                         "id": searchResult[i].id,
//                         "name": searchResult[i].name
//                     })
//                 }
//             } else {
//                 res.send(response);
//             }
//         }
//         catch (error) {
//             res.send(error);
//         }
//     }

//     const getDataFromWFMdb = (req, resp) => {
//         connection.getConnection(function (error, tempCont) {
//             if (!!error) {
//                 tempCont.release();
//                 res.send(error);
//                 console.log('Error');
//             } else {
//                 console.log('Connected');
//                 tempCont.query(geospatialSearchQuery, [location.lat, location.lat, location.lng], function (error, rows, field) {
//                     tempCont.release();
//                     if (!!error) {
//                         res.send(error);
//                         console.log('Error in the query:', error);
//                     } else {
//                         console.log("Successful query\n");
//                         for (let i = 0; i < rows.length; i++) {
//                             dataToSend.places.push({
//                                 "formatted_address": rows[i].formatted_address,
//                                 "geometry__location__lat": rows[i].geometry__location__lat,
//                                 "geometry__location__lng": rows[i].geometry__location__lng,
//                                 "id": rows[i].id,
//                                 "name": rows[i].name
//                             })
//                         }
//                         res.send(dataToSend);
//                     }
//                 });
//             }
//         })
//     }

//     //get latitude and longitude from address and call getDataFromGooglePlaces
//     const getLatLngFromAddress = async () => {
//         try {
//             const response = await axios.get(urlForGeocodingAPI);
//             if (response.statusText === "OK") {
//                 location = response.data.results[0].geometry.location;
//                 dataToSend.mapCenter = location;
//                 await getDataFromGooglePlaces();
//                 await getDataFromWFMdb();
//             } else {
//                 res.send(response);
//             }
//         }
//         catch (error) {
//             res.send(error);
//         }
//     }

//     getLatLngFromAddress();
// });

// app.get("/api/getZillowData", function (req, res) {
//     const zillow = new Zillow(zillowKey);
//     const parameters = {
//         // address: "14351 Jessica St.",
//         // citystatezip: "Garden Grove, CA",
//         // rentzestimate: false,
//         // state: "CA",
//         zip: "92843"
//     }
//     // zillow.get('GetRegionChildren', parameters)
//     zillow.get('GetDemographics', parameters)
//         .then(results => {
//             // console.log(results);
//             res.send(results);
//             // return results;
//         })
// });




app.listen(PORT, () => {
    console.log('Server Running at localhost:', + PORT);
}).on('error', (err => {
    console.log("Server listen error, you probably already have a server on PORT:" + PORT);
}))