const { Server } = require('socket.io');

let io = null;

/**
 * @desc    Initializes the Socket.io server.
 * @param {object} httpServer - The Node.js HTTP server instance.
 */
const init = (httpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: "*", // Adjust this for production (e.g., your frontend URL)
      methods: ["GET", "POST"]
    }
  });

  // Handle incoming connections
  io.on('connection', (socket) => {
    console.log(`[Socket.io] A user connected: ${socket.id}`);

    // --- Room Setup ---
    // Sockets must join rooms to receive specific broadcasts.
    // 'Public' room for map updates (alerts, incident status changes)
    // 'Admin' room for dashboard updates (new pending incidents)
    
    // By default, join the 'Public' room
    socket.join('Public');

    // Listen for an event from an admin client to join the 'Admin' room
    socket.on('joinAdminRoom', (payload, callback) => {
      // In a real app, you'd validate this with a JWT passed in 'payload'
      console.log(`[Socket.io] Socket ${socket.id} joining 'Admin' room.`);
      socket.join('Admin');
      
      // Acknowledge that the client joined
      if (callback) {
        callback({ status: 'ok', room: 'Admin' });
      }
    });

    // Handle disconnections
    socket.on('disconnect', () => {
      console.log(`[Socket.io] User disconnected: ${socket.id}`);
    });
  });

  console.log('[Socket.io] Server initialized.');
  return io;
};

/**
 * @desc    Returns the active Socket.io server instance.
 * @returns {object|null} - The Socket.io instance or null if not initialized.
 */
const getSocket = () => {
  if (!io) {
    console.error('[Socket.io] Socket.io has not been initialized. Call init() first.');
  }
  return io;
};

module.exports = {
  init,
  getSocket,
};