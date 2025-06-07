const dgram = require('dgram');
const express = require('express');
const protobuf = require('protobufjs');
const cors = require('cors');

const app = express();
const server = dgram.createSocket('udp4');
const PORT = 8000;
const HOST = '0.0.0.0';

let clients = new Set();
app.use(cors());

let DataMessage;
protobuf.load('./proto/data.proto')
    .then(root => {
        DataMessage = root.lookupType('com.example.protobuf.Data');
        console.log('Proto file loaded successfully');
    })
    .catch(err => {
        console.error('Error loading proto file:', err);
    });

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
        if (!DataMessage) {
            console.log('Waiting for protobuf definition to load...');
            return;
        }

        const decodedMessage = DataMessage.decode(message);
        const verificationError = DataMessage.verify(decodedMessage);
        
        if (verificationError) {
            throw new Error(verificationError);
        }

        const messageObject = DataMessage.toObject(decodedMessage, {
            longs: String,
            enums: String,
            defaults: true
        });

        console.log('Decoded Protobuf:', messageObject);

        clients.forEach(client => {
            client.write(`data: ${JSON.stringify(messageObject)}\n\n`);
        });
    } catch (err) {
        console.error('Error processing protobuf message:', err.message);
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

app.listen(4047, () => {
    console.log('HTTP server listening on port 4047');
});
