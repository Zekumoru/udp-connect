// UDP Server
import dgram from 'node:dgram';

const serverName = 'hostname';
const serverPort = 12000;

// Create UDP socket
const serverSocket = dgram.createSocket('udp4');

// Manually assign port of the server
serverSocket.bind(serverPort, serverName);

// Print that the server has opened
serverSocket.on('listening', () => {
  const address = serverSocket.address();
  console.log(
    `The server is ready to receive at ${address.address}:${address.port}.`
  );
});

// Receive the message in bytes, convert to uppercase, and send back to client
serverSocket.on('message', (message, clientAddress) => {
  const modifiedMessage = message.toString().toUpperCase();
  serverSocket.send(
    Buffer.from(modifiedMessage),
    clientAddress.port,
    clientAddress.address
  );
});
