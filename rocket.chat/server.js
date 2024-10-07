const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 4000 });

wss.on('connection', (ws) => {
  console.log('New client connected');

  ws.on('message', (message) => {
    console.log('Received message from client:', message);
    ws.send(`Server response: ${message}`);
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

console.log('WebSocket server is running on ws://localhost:4000');
