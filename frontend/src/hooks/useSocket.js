import { useEffect, useContext, useRef, useState } from 'react';
import io from 'socket.io-client';
import { AuthContext } from '../context/AuthContext.jsx';
import { ChatContext } from '../context/ChatContext.jsx';

const ENDPOINT = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000';

const useSocket = () => {
  const { user } = useContext(AuthContext);
  const { selectedChat, setMessages, notification, setNotification } = useContext(ChatContext);
  const socketRef = useRef(null);
  const [socketConnected, setSocketConnected] = useState(false);

  // Initialize socket connection
  useEffect(() => {
    if (user && !socketRef.current) {
      console.log('Initializing socket connection...');
      socketRef.current = io(ENDPOINT, {
        transports: ['websocket', 'polling'],
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionAttempts: 5,
      });

      socketRef.current.emit('setup', user);
      
      socketRef.current.on('connected', () => {
        console.log('✅ Socket connected successfully');
        setSocketConnected(true);
      });

      socketRef.current.on('disconnect', () => {
        console.log('❌ Socket disconnected');
        setSocketConnected(false);
      });

      socketRef.current.on('reconnect', () => {
        console.log('🔄 Socket reconnected');
        setSocketConnected(true);
        if (user) {
          socketRef.current.emit('setup', user);
        }
      });

      return () => {
        if (socketRef.current) {
          console.log('Cleaning up socket connection');
          socketRef.current.disconnect();
          socketRef.current = null;
        }
      };
    }
  }, [user]);

  // Join chat room when chat is selected
  useEffect(() => {
    if (socketRef.current && selectedChat && socketConnected) {
      console.log('Joining chat room:', selectedChat._id);
      socketRef.current.emit('join_chat', selectedChat._id);
    }
  }, [selectedChat, socketConnected]);

  // Listen for incoming messages
  useEffect(() => {
    if (socketRef.current && socketConnected) {
      const handleMessageReceived = (newMessage) => {
        console.log('📨 Message received:', newMessage);
        
        if (!selectedChat || selectedChat._id !== newMessage.chat._id) {
          // Add to notifications if not in current chat
          if (!notification.find(n => n._id === newMessage._id)) {
            setNotification([newMessage, ...notification]);
          }
        } else {
          // Add to current chat messages
          setMessages((prevMessages) => {
            // Prevent duplicate messages
            if (prevMessages.find(m => m._id === newMessage._id)) {
              return prevMessages;
            }
            return [...prevMessages, newMessage];
          });
        }
      };

      socketRef.current.on('message_received', handleMessageReceived);

      return () => {
        if (socketRef.current) {
          socketRef.current.off('message_received', handleMessageReceived);
        }
      };
    }
  }, [selectedChat, notification, setMessages, setNotification, socketConnected]);

  const emitTyping = (room) => {
    if (socketRef.current && socketConnected) {
      socketRef.current.emit('typing', room);
    }
  };

  const emitStopTyping = (room) => {
    if (socketRef.current && socketConnected) {
      socketRef.current.emit('stop_typing', room);
    }
  };

  const emitSendMessage = (message) => {
    if (socketRef.current && socketConnected) {
      console.log('📤 Emitting message:', message._id);
      socketRef.current.emit('send_message', message);
    }
  };

  const onTyping = (callback) => {
    if (socketRef.current) {
      socketRef.current.on('typing', callback);
    }
  };

  const onStopTyping = (callback) => {
    if (socketRef.current) {
      socketRef.current.on('stop_typing', callback);
    }
  };

  return {
    emitTyping,
    emitStopTyping,
    emitSendMessage,
    onTyping,
    onStopTyping,
    socketConnected,
  };
};

export default useSocket;
