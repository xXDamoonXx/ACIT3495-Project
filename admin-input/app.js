var express = require('express')
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
const app = express()
const port = 3003

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.render( 'index.html');
})

app.post('/submit-data', (req, res) => {
    let data = req.body
    console.log(data.temp, data.date, data.time)
    insert_data(data)
    res.redirect('/');
})

app.post('/create-db', (req, res) => {
    create_db()
    res.redirect('/');
})

app.post('/list-db', (req, res) => {
    list_db()
    res.redirect('/');
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

const mysql = require("mysql");
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Password123",
    database: "weather",
    port: 49155
});
connection.connect();



const data_to_db = (new_date, data, db) => {
    mycursor = connection.cursor()

    sql = "INSERT INTO weather (datetime, temp) VALUES (%s, %s)"
    val = (new_date, data.temp)
    mycursor.execute(sql, val)

    mydb.commit()

    print(mycursor.rowcount, "record inserted.")
}
const insert_data = (data) => {
    if (err) throw err;
    if (data.time != null && data.date != null) {
        let date = data.date.split('-')
        let time = data.time.split(':')
        let new_date = new Date((date[0], date[1], date[2], time[0], time[1]))
        data_to_db(new_date, data)
    } else {
        let new_date = new Date.now()
        data_to_db(new_date, data)
    }
};

