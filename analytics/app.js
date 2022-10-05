const express = require('express');
const mysql = require('mysql');

const app = express();

app.use(express.static('public'));
app.use(express.json());

const { MongoClient } = require("mongodb");
// Connection URI

const mongodb_database = process.env.MONGODB_DATABASE


const uri =
  "mongodb+srv://sample-hostname:27017/?maxPoolSize=20&w=majority";
// Create a new MongoClient
const client = new MongoClient(uri);
async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    // Establish and verify connection
    await client.db(mongodb_database).command({ ping: 1 });
    console.log("Connected successfully to server");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);


const mysql_hostname = process.env.MYSQL_HOSTNAME
const mysql_database = process.env.MYSQL_DATABASE
const mysql_password = process.env.MYSQL_PASSWORD


var MySQLEvents = require('mysql-events');
var dsn = {
  host:     mysql_hostname,
  user:     mysql_database,
  password: mysql_password,
};
var mysqlEventWatcher = MySQLEvents(dsn);
var watcher =mysqlEventWatcher.add(
  'myDB.table.field.value',
  function (oldRow, newRow, event) {
     //row inserted
    if (oldRow === null) {
      //insert code goes here
    }
 
     //row deleted
    if (newRow === null) {
      //delete code goes here
    }
 
     //row updated
    if (oldRow !== null && newRow !== null) {
      //update code goes here
    }
 
    //detailed event information
    //console.log(event)
  }, 
  'match this string or regex'
);
