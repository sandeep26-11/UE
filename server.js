const dgram = require('dgram');
const express = require('express');
const app = express();

const server = dgram.createSocket('udp4');
const PORT = 8000;
const HOST = '0.0.0.0';

let clients = new Set();

app.get('/api/udp-events', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    clients.add(res);

    req.on('close', () => {
        clients.delete(res);
    });
});

server.on('message', (message, remote) => {
    console.log(`Received data from ${remote.address}:${remote.port}`);
    
    try {
        const jsonData = JSON.parse(message.toString());
        console.log('Parsed JSON:', jsonData);
        
        // Send to all connected clients
        clients.forEach(client => {
            client.write(`data: ${JSON.stringify(jsonData)}\n\n`);
        });
    } catch (err) {
        console.error('Error parsing JSON:', err.message);
    }
});

server.on('listening', () => {
    const address = server.address();
    console.log(`UDP server listening on ${address.address}:${address.port}`);
});

server.on('error', (err) => {
    console.error('Server error:', err.message);
    server.close();
});

server.bind(PORT, HOST);

app.listen(3000, () => {
    console.log('HTTP server listening on port 3000');
});
