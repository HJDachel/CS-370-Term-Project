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
const express = require('express'); // require express for web server and for get, post methods, etc.
/** instantiate requires and name them */
const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(express.text());

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
    console.log("GET request");
    console.log(req.body);
    res.send(req.body);
});

server.post("/api", (req, res) => {
    console.log("POST request");
    console.log(req.body);
    res.json(req.body);
});

server.put("/api", (req, res) => {
    console.log("PUT request");
    console.log(req.body);
    res.send(req.body);
});

server.delete("/api", (req, res) => {
    console.log("DELETE request");
    console.log(req.body);
    res.send(req.body);
});



/** set the server to listen on port 3000 */
const port = 3000;

server.listen(port, () => {
    console.log(`Server listening on ${port}`);
});