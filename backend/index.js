//Express App
const express = require('express');
const app = express();
const port = 3000;




// create database connection
setTimeout(() => {
    const mysql = require('mysql');

    let db = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });

    if (process.env.DB_HOST == null) {
        console.warn("DB_HOST is null, using static connection details"); 
        db = mysql.createConnection({
            host: "localhost",
            port: 3307,
            user: "root",
            password: "root",
            database: "chat" 
        });
    }

    console.info("Database connection details", {
        host: db.host,
        user: db.user,
        password: db.password,
        database: db.database 
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
}, 5000);

// Rum server   
app.listen(port, () => {
    console.log(`Chat app listening at http://localhost:${port}`)
});