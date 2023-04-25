//Express App
const { log } = require('console');
const { captureRejectionSymbol } = require('events');
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

    app.use(function (req, res, next) {
        res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
        next();
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
                "http://localhost:8080",
                "http://127.0.0.1:8080"
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
                console.log(room);
                console.log(result.map(r => r.name == room));
                if (result.map(r => r.name == room)) {
                    //check if socket is already in room
                    if (socket.rooms.has(room)) {
                        socket.emit('error', 'Already in room: ' + room);
                        console.log('already in room');
                        return;
                    }
                    socket.join(room);
                    socket.emit('success', 'Joined room: ' + room);
                    console.log('joined room');

                    socket.on('leave-room', () => {
                        socket.leave(room);
                        socket.emit('success', 'Left room: ' + room);
                        console.log('left room');
                    });


                    //get messages from database
                    db.query(`SELECT message FROM messages WHERE room_id = (SELECT id FROM rooms WHERE name = '${room}')`, (err, result) => {
                        if (err) throw err;

                        socket.emit('messages', result.map(r => r.message));
                    });
                } else {
                    socket.emit('error', 'Room does not exist');
                    console.log('room does not exist');
                }
            });

            socket.on('message', (message) => {
                console.log('message sent: ' + message);

                db.query(`SELECT id FROM rooms WHERE name = '${room}'`, (err, result) => {
                    if (err) throw err;

                    if (result.length > 0)
                        db.query(`INSERT INTO messages (room_id, message) VALUES (${result[0].id}, '${message}')`, (err, result) => {
                            if (err) throw err;
                            console.log('message saved');
                            io.to(room).emit('message', message);
                        });
                });
            });
        });
        socket.on('create-room', (room, message) => {
            console.log('creating room');
            db.query(`INSERT INTO rooms (name) VALUES ('${room}')`, (err, result) => {
                if (err) {
                    if (err.code == 'ER_DUP_ENTRY') {
                        socket.emit('error', 'Room already exists');
                        console.log('room already exists');
                    } else throw err;
                } else {
                    socket.emit('success', 'Room created');
                    io.emit('onRoomCreated', room);
                }
            });
        });


        socket.on('leave-room', (room) => {
            socket.leave(room);
            socket.emit('success', 'Left room: ' + room);
            console.log('left room');
        });
    });

    // Rum server   
    server.listen(port, () => {
        console.log(`Chat app listening at http://localhost:${port}`)
    });
}, 5000);