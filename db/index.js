  const mysql = require('mysql');
  const { dbConfig } = require('../config');

  const connection = mysql.createConnection(dbConfig);

  connection.connect((err) => {
      if(err){
          return console.log('Error connecting to MySQL DB', err.message);
      }

      console.log('MYSQL DB connected!');
  });

  module.exports = connection;