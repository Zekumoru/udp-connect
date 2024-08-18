// UDP Client
import dgram from 'node:dgram';
import { exit, argv } from 'node:process';

const serverName = 'hostname';
const serverPort = 12000;

// Create UDP socket
const clientSocket = dgram.createSocket('udp4');

// Get message to send to server from command line args
const message = argv.splice(2).join(' ');
if (!message) {
  console.error('ClientError: Missing message to send to server.');
  exit(1);
}

// Convert message to bytes and then send it to the server
clientSocket.send(Buffer.from(message), serverPort, serverName, (error) => {
  if (!error) return;

  console.error('ClientError: Could not establish a connection to server.');
  clientSocket.close();
});

// Display the modified message done by the server then close the connection
clientSocket.on('message', (modifiedMessage) => {
  console.log(`Modified message: ${modifiedMessage.toString()}`);
  clientSocket.close();
});
