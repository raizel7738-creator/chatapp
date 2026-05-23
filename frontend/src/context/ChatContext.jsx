import { createContext, useState, useEffect, useContext } from 'react';
import axios from '../utils/axios.js';
import { AuthContext } from './AuthContext.jsx';

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [notification, setNotification] = useState([]);
  const { user } = useContext(AuthContext);

  const fetchChats = async () => {
    try {
      const { data } = await axios.get('/chats');
      setChats(data);
    } catch (error) {
      console.error('Error fetching chats:', error);
    }
  };

  const fetchMessages = async (chatId) => {
    try {
      const { data } = await axios.get(`/messages/${chatId}`);
      setMessages(data);
      return data;
    } catch (error) {
      console.error('Error fetching messages:', error);
      return [];
    }
  };

  const sendMessage = async (content, chatId) => {
    try {
      const { data } = await axios.post('/messages', {
        content,
        chatId,
      });
      setMessages([...messages, data]);
      
      // Update latest message in chats
      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat._id === chatId ? { ...chat, latestMessage: data } : chat
        )
      );
      
      return data;
    } catch (error) {
      console.error('Error sending message:', error);
      return null;
    }
  };

  const createChat = async (userId) => {
    try {
      const { data } = await axios.post('/chats', { userId });
      
      // Add to chats if not already present
      if (!chats.find((c) => c._id === data._id)) {
        setChats([data, ...chats]);
      }
      
      setSelectedChat(data);
      return data;
    } catch (error) {
      console.error('Error creating chat:', error);
      return null;
    }
  };

  const createGroupChat = async (users, name) => {
    try {
      const { data } = await axios.post('/chats/group', {
        users: JSON.stringify(users),
        name,
      });
      setChats([data, ...chats]);
      return data;
    } catch (error) {
      console.error('Error creating group chat:', error);
      return null;
    }
  };

  const searchUsers = async (search) => {
    try {
      const { data } = await axios.get(`/chats/users?search=${search}`);
      return data;
    } catch (error) {
      console.error('Error searching users:', error);
      return [];
    }
  };

  useEffect(() => {
    if (user) {
      fetchChats();
    }
  }, [user]);

  return (
    <ChatContext.Provider
      value={{
        chats,
        selectedChat,
        setSelectedChat,
        messages,
        setMessages,
        notification,
        setNotification,
        fetchChats,
        fetchMessages,
        sendMessage,
        createChat,
        createGroupChat,
        searchUsers,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
