    ///Connecting to DB
    //Where SQL connects to my server
  
  
  
  const mysql = require('mysql');
  const { dbConfig } = require('../config');
  const { promisify } = require('util');

  const connection = mysql.createConnection(dbConfig);

  connection.connect((err) => {
      if(err){
          return console.log('Error connecting to MySQL DB', err.message);
      }

      console.log('MYSQL DB connected!');
  });

  connection.query = promisify(connection.query);

  module.exports = connection;

