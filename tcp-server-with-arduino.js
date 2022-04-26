// User node.js net library
// https://nodejs.org/api/net.html
const net = require('net');

// Keep a list of active connections
var connections = [];

// Allocate port for our server
const PORT = 50000;

// Start a server application
// https://nodejs.org/api/net.html#netcreateserveroptions-connectionlistener
net.createServer(function(socket) {

    // Set data encoding for this connection
    socket.setEncoding('utf8');

    // Set a nickname for the new user
    socket.nick = "user" + (Math.random() * 100000).toFixed()

    // Print connection status to server log
    console.log(`User ${socket.nick} connected!`);
    
    // Send a response to new user/client
    socket.write("Hello " + socket.nick + "\r\n");

    // Add connection to the array
    connections.push(socket);

    // Handle incoming 'data' event (from client/user)
    socket.on('data', function(buffer) {
        console.log("received data:", buffer);

        // Clean the incoming message and cut it in pieces
        var command = buffer.toString().trim().split(" ");

        // The available commands on the server
        switch(command[0]) { // command[0] points to the first word of the command
 
            default:
                //socket.write("\tCommand '" + command[0] + "' not found\r\n");
                break;
        }
    });
// Bind server to a port
}).listen(PORT);