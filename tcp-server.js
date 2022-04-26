// User node.js net library
// https://nodejs.org/api/net.html
const net = require('net');

// Keep a list of active connections
var connections = [];

// Allocate port for our server
const PORT = 8000;

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
            //case 'help':
            case 'HELP':
                socket.write("\r\nAvailable server commands are: HELP, MSG, WHOIS\r\n");
                break;

            //case 'nick':
            case 'NICK':
                console.log("NICK command received");
                // command[1] is the second word in the command
                // What is there's no second word?
                socket.nick = command[1].trim();    
                socket.write("You are now known as: " + socket.nick + "\r\n");
                break;

            //case 'whois':
            case 'WHOIS':
                console.log("WHOIS command received:", command);
                connections.forEach(function (client) {
                    if(client.nick.trim() == command[1].trim()) {
                        socket.write(`WHOIS: known as ${client.nick}\r\n`);
                        socket.write(`\taddress: ${client.address().family}\r\n`);
                        socket.write(`\tIP: ${client.address().address}\r\n`);
                    }
                });
                break;
            //case 'msg':
            case 'MSG':
                connections.forEach(function(user) {
                    user.write(socket.nick + " says: " + 
                                command.slice(1).join(" ") + 
                                "\r\n");
                });
                break;
            //case 'PRIVMSG':
                // TODO: Could you allow personal messages between users, e.g.
                // command[0] = command
                // command[1] = recipients nickname
                // command[2] = the message to send to the single user
                //break;
            default:
                socket.write("\tCommand '" + command[0] + "' not found\r\n");
                break;
        }
    });
// Bind server to a port
}).listen(PORT);