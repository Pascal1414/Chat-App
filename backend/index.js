//Express App
const { log } = require('console');
const express = require('express');
const app = express();
const http = require("http");
const { Server } = require("socket.io");
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



    const server = http.createServer(app)
    io = new Server(server, {
        cors: {
            origin: [
                "http://localhost:5173",
                "http://127.0.0.1:5173"
            ]
        }
    });
    io.on('connection', (socket) => {
        console.log('new connection');

        socket.on('disconnect', () => {
            console.log('connection lost');
        });

        socket.on('join-room', (room) => {
            console.log('joining room');
            //get rooms from database
            db.query('SELECT * FROM rooms', (err, result) => {
                if (err) throw err;

                console.log(result);
                if (result.includes(room)) {
                    socket.join(room);
                    socket.emit('success', 'Joined room');
                } else {
                    socket.emit('error', 'Room does not exist');
                }
            });
        });
        socket.on('create-room', (room, message) => {
            console.log('creating room');
            //insert room into database
            db.query(`INSERT INTO rooms (name) VALUES ('${room}')`, (err, result) => {
                if (err) throw err;
                socket.emit('success', 'Room created');
            });
        });
    });


    // Rum server   
    server.listen(port, () => {
        console.log(`Chat app listening at http://localhost:${port}`)
    });
}, 5000);

