const express = require('express');
const mysql = require('mysql');

const app = express();

app.use(express.static('public'));
app.use(express.json());

const { MongoClient } = require("mongodb");

const mongodb_database = process.env.MONGODB_DATABASE

var url = "mongodb://localhost:27017/";


const data_to_db = (data, stats, db) => {
  var dbo = db.db("mydb");
  var myobj = [
      {'datetime': data.date, 
      "temp_avg": stats[0], 
      "temp_low": stats[1],
      "temp_high": stats[2], 
      'temp_range': data.temp_range, }
  ];
  dbo.collection("weather").insertMany(myobj, function(err, res) {
      if (err) throw err;
      console.log("Number of documents inserted: " + res.insertedCount);
      db.close();

  });
}
const insert_data = (data) => {
  MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  let avg_time = (data.temp_range, data.temp_range.length) * data.temp_range.length
  let min_time = data.temp_range.min()
  let max_time = data.temp_range.max()
  
  stats = [avg_time, min_time, max_time]

  data_to_db(data, stats, db)

});

};


const mysql_hostname = process.env.MYSQL_HOSTNAME
const mysql_database = process.env.MYSQL_DATABASE
const mysql_password = process.env.MYSQL_PASSWORD
const mysql_port = process.env.MYSQL_PORT


var MySQLEvents = require('mysql-events');

var dsn = {
  host:     mysql_hostname,
  user:     mysql_database,
  password: mysql_password,
  port:     mysql_port
};

var mysqlEventWatcher = MySQLEvents(dsn);
mysqlEventWatcher.add(
  'myDB',
  function (oldRow, newRow, event) {


    if (oldRow === null) {
      insert_data(newRow)
    }
 
});

