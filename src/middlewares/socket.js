const connectedSockets = new Set();

connectedSockets.broadcast = function(data, except) {
    for (let client of this) {
        client.write(data);
    }
}

const socket = () => {
    const net = require('net');
    const server = net.createServer((client) => {
        connectedSockets.add(client);

        client.on('connect', () => {
            console.log("a user connected");
        });

        client.on('data', (msg) => {
            console.log('rcv: ' + msg);
            connectedSockets.broadcast(msg, client);
        });
    });
    
    server.listen(5000, () => {
        console.log(`Http server has listening on port 5000!`);
    });
}

module.exports = socket;