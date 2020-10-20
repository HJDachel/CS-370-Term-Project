

const express = require('express');
const server = express();

server.get("/test", (req, res) => {
    res.json({message: "Hello world"})
});

server.get("/", (reg, res) => {
    res.sendFile(__dirname + '/index.html');
});

const port = 3000;

server.listen(port, () => {
    console.log(`Server listening on ${port}`);
});