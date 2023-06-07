const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const bodyParser = require("body-parser")
const app = express();
app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: false }))
const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });

io.on("connection", (socket) => {
    const mainNS = io.of("/");
  
    // Emit initial count to the connecting client
    socket.emit("initialCount", mainNS.sockets.size);
  
    // Broadcast count updates to all connected clients
    const updateCount = () => {
      io.emit("countUpdated", mainNS.sockets.size);
    };
    
    updateCount();
  
    socket.on("disconnect", () => {
      // Decrease count on disconnection
      updateCount();
    });

    socket.on("sendMSG", (msg) => {
        io.emit("msgUpdate", msg)
    })
});

io.engine.on("connection_error", (err) => {
    console.log(err.req);      // the request object
    console.log(err.code);     // the error code, for example 1
    console.log(err.message);  // the error message, for example "Session ID unknown"
    console.log(err.context);  // some additional error context
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html")
})

httpServer.listen(3000);


