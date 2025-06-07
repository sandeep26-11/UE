const protobuf = require('protobufjs');
const dgram = require('dgram');
const client = dgram.createSocket('udp4');

let DataMessage;
protobuf.load('./proto/data.proto')
    .then(root => {
        DataMessage = root.lookupType('com.example.protobuf.Data');
        sendTestMessage();
    })
    .catch(err => {
        console.error('Error loading proto file:', err);
    });

function sendTestMessage() {
    const payload = {
        rsrp: -85,
        throughput: 100,
        rsrq: -10,
        latitude: 37.7749,
        longitude: -122.4194,
        ip: "192.168.1.1",
        pci: 245,
        arfcn: 500,
        
    };

    const errMsg = DataMessage.verify(payload);
    if (errMsg) throw Error(errMsg);

    const message = DataMessage.create(payload);
    const buffer = DataMessage.encode(message).finish();

    client.send(buffer, 8000, 'localhost', (err) => {
        if (err) {
            console.error('Error sending message:', err);
        } else {
            console.log('Test message sent successfully');
        }
        client.close();
    });
}
