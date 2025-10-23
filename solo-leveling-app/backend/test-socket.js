// Simple Socket.io client test
const { io } = require('socket.io-client');

const SERVER = process.env.SERVER || 'http://localhost:5001';
const socket = io(SERVER, { transports: ['websocket'], reconnectionAttempts: 3 });

socket.on('connect', () => {
  console.log('Connected to server, socket id:', socket.id);
  // Send a test message
  socket.emit('sendMessage', { userId: null, username: 'TestClient', text: 'Hello from test client' });
});

socket.on('newMessage', (msg) => {
  console.log('Received newMessage event:', msg);
  // Close after receiving the broadcast
  socket.disconnect();
});

socket.on('connect_error', (err) => {
  console.error('Connection error:', err.message);
  process.exit(1);
});

socket.on('disconnect', (reason) => {
  console.log('Disconnected:', reason);
});
