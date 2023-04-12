//Express App
const express = require('express');
const app = express();
const port = 3000;

const mysql = require('mysql');

// create database connection
const db = mysql.createConnection({
    host: 'database',
    user: 'root',
    password: 'root',
    database: 'chat'
});

// connect to database
db.connect((err) => {
    if (err) throw err;
    console.log('Connected to database');
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/rooms', (req, res) => {
    db.query('SELECT * FROM rooms', (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// Rum server   
app.listen(port, () => {
    console.log(`Chat app listening at http://localhost:${port}`)
});