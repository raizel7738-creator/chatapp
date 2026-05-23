import User from '../models/User.js';

const socketHandler = (io) => {
  const userSocketMap = new Map(); // Track user ID to socket ID mapping

  io.on('connection', (socket) => {
    console.log('✅ New socket connection:', socket.id);

    // Setup user connection
    socket.on('setup', async (userData) => {
      console.log('👤 User setup:', userData._id);
      socket.userId = userData._id;
      socket.join(userData._id);
      
      // Store user socket mapping
      userSocketMap.set(userData._id, socket.id);
      
      socket.emit('connected');
      
      // Update user online status
      try {
        await User.findByIdAndUpdate(userData._id, { isOnline: true });
        socket.broadcast.emit('user_online', userData._id);
        console.log('✅ User online:', userData._id);
      } catch (error) {
        console.error('❌ Error updating user status:', error);
      }
    });

    // Join a chat room
    socket.on('join_chat', (room) => {
      socket.join(room);
      console.log(`📥 User ${socket.userId} joined chat room: ${room}`);
    });

    // Typing indicator
    socket.on('typing', (room) => {
      console.log(`⌨️ User typing in room: ${room}`);
      socket.in(room).emit('typing', room);
    });

    socket.on('stop_typing', (room) => {
      socket.in(room).emit('stop_typing', room);
    });

    // Send message
    socket.on('send_message', (newMessageReceived) => {
      const chat = newMessageReceived.chat;

      if (!chat.users) {
        console.log('❌ chat.users not defined');
        return;
      }

      console.log(`📤 Broadcasting message ${newMessageReceived._id} to ${chat.users.length} users`);

      // Emit to chat room
      socket.to(chat._id).emit('message_received', newMessageReceived);

      // Also emit to each user's personal room
      chat.users.forEach((user) => {
        if (user._id === newMessageReceived.sender._id) return;
        
        console.log(`📨 Sending to user: ${user._id}`);
        io.to(user._id).emit('message_received', newMessageReceived);
      });
    });

    // Disconnect
    socket.on('disconnect', async () => {
      console.log('❌ User disconnected:', socket.id);
      
      if (socket.userId) {
        userSocketMap.delete(socket.userId);
        
        // Update user offline status
        try {
          await User.findByIdAndUpdate(socket.userId, {
            isOnline: false,
            lastSeen: new Date(),
          });
          socket.broadcast.emit('user_offline', socket.userId);
          console.log('👋 User offline:', socket.userId);
        } catch (error) {
          console.error('❌ Error updating user status:', error);
        }
      }
    });

    // Handle errors
    socket.on('error', (error) => {
      console.error('❌ Socket error:', error);
    });
  });

  // Log active connections periodically
  setInterval(() => {
    console.log(`📊 Active connections: ${userSocketMap.size}`);
  }, 60000); // Every minute
};

export default socketHandler;
