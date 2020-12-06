/**
 * 
 * 
 * CS370 Project, Team 18 (Fall Semester 2020)
 * Hayden Dachel
 * Michael Egues
 * Frank Gansukh
 * 
 * 
 */

/** requires */
const e = require('express');
const express = require('express'); // require express for web server and for get, post methods, etc.
/** instantiate requires and name them */
const server = express();

const mysql = require('mysql');

server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(express.text());

/** connection info for the mysql connection */
var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: 'password',
    database: 'dates',
    multipleStatements: true
});

/** attempt to connect to the DB */
mysqlConnection.connect((err)=> {
    if (!err) {
        console.log("Successfully connected to DB");
    }else {
        console.log("Connection to DB failed" + JSON.stringify(err, undefined, 2));
        process.exit(1);
    }
});


/** sql string to create the dates table if it doesn't already exist. */
let createDates = `create table if not exists dates(
                        date int primary key,
                        Name varchar(50) not null,
                        Flow int not null
                )`;

/** creates dates table if it doesn't already exist. runs every time the server starts. */
mysqlConnection.query(createDates, function(err, results, fields) {
    if (err) {
        console.log(err.message);
    }
});


/** method to test express */
server.get("/test", (req, res) => {
    res.json({message: "Hello world"})
});


/** serve front page html. Not sure if this can be used for this project */
server.get("/front", (req, res) => {
    res.sendFile(__dirname + '/index.html');
});


/** REST methods. For now just returns request body */
server.get("/api", (req, res) =>  {
    console.log(req.body.date);
    mysqlConnection.query('SELECT * FROM dates WHERE date=?', [req.body.date], (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        }else {
            console.log(err.message);
        }
    });
});

/** post request inserts record into table */
server.post("/api", (req, res) => {
    mysqlConnection.query(`INSERT INTO dates(date, Name, Flow)
        VALUES(?,?,?)`, [req.body.date, req.body.name, req.body.flow], (err, rows, fields) => {
        if (!err) {
            res.send("Successfully added record!");
        }else {
            console.log(err.message);
            res.send("Error: could not add record!");
        }
    });
});

server.put("/api", (req, res) => {
    mysqlConnection.query('UPDATE dates SET Name =?,Flow=? WHERE date=?', [req.body.name, req.body.flow, req.body.date], (err, rows, fields) => {
        if (!err) {
            res.send("Successfully updated record!");
        }else {
            console.log(err.message);
            res.send("Error: Unable to update record!");
        }
    });
});

server.delete("/api", (req, res) => {
    mysqlConnection.query('DELETE FROM dates WHERE date =?', [req.body.date], (err, rows, fields) => {
        if (!err) {
            res.send("Successfully deleted record!");            
        }else {
            console.log(err.message);
            res.send("Error: Could not delete record!");
        }
    });
});



/** set the server to listen on port 3000 */
const port = 3000;

server.listen(port, () => {
    console.log(`Server listening on ${port}`);
});