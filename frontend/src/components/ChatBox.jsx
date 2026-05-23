import { useState, useEffect, useContext, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Smile, Paperclip } from 'lucide-react';
import { ChatContext } from '../context/ChatContext.jsx';
import { AuthContext } from '../context/AuthContext.jsx';
import MessageBubble from './ui/MessageBubble';
import TypingIndicator from './ui/TypingIndicator';
import Avatar from './ui/Avatar';
import GradientButton from './ui/GradientButton';
import useSocket from '../hooks/useSocket.js';

const ChatBox = () => {
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const { selectedChat, messages, fetchMessages, sendMessage } = useContext(ChatContext);
  const { user } = useContext(AuthContext);
  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);
  
  const { emitTyping, emitStopTyping, emitSendMessage, onTyping, onStopTyping, socketConnected } = useSocket();

  useEffect(() => {
    if (selectedChat) {
      setLoading(true);
      fetchMessages(selectedChat._id).finally(() => setLoading(false));
    }
  }, [selectedChat]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    onTyping(() => setIsTyping(true));
    onStopTyping(() => setIsTyping(false));
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const getChatName = () => {
    if (selectedChat.isGroupChat) {
      return selectedChat.chatName;
    }
    const otherUser = selectedChat.users.find((u) => u._id !== user._id);
    return otherUser?.name || 'Unknown User';
  };

  const getChatAvatar = () => {
    if (selectedChat.isGroupChat) {
      return null;
    }
    const otherUser = selectedChat.users.find((u) => u._id !== user._id);
    return otherUser?.avatar;
  };

  const handleTyping = (e) => {
    setNewMessage(e.target.value);

    if (!selectedChat) return;

    emitTyping(selectedChat._id);

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      emitStopTyping(selectedChat._id);
    }, 3000);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;

    emitStopTyping(selectedChat._id);
    
    const messageContent = newMessage;
    setNewMessage('');

    const sentMessage = await sendMessage(messageContent, selectedChat._id);
    
    if (sentMessage) {
      emitSendMessage(sentMessage);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-surface h-full">
      {/* Chat Header */}
      <motion.div
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-surface/80 backdrop-blur-xl border-b border-white/10 px-4 md:px-6 py-4"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar
              src={getChatAvatar()}
              name={getChatName()}
              size="md"
              online={false}
            />
            <div>
              <h2 className="text-lg font-semibold text-text-primary">{getChatName()}</h2>
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${socketConnected ? 'bg-green-400' : 'bg-red-400'}`} />
                <span className="text-xs text-text-muted">
                  {socketConnected ? 'Connected' : 'Reconnecting...'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <div className="text-text-muted text-sm">Loading messages...</div>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col justify-center items-center h-full space-y-2">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
              <Send className="w-8 h-8 text-text-muted" />
            </div>
            <p className="text-text-muted text-sm">No messages yet</p>
            <p className="text-text-muted text-xs">Start the conversation!</p>
          </div>
        ) : (
          <>
            <AnimatePresence>
              {messages.map((message) => (
                <MessageBubble
                  key={message._id}
                  message={message}
                  isOwn={message.sender._id === user._id}
                />
              ))}
            </AnimatePresence>
            {isTyping && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Message Input */}
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-surface/80 backdrop-blur-xl border-t border-white/10 p-4 md:p-6"
      >
        <form onSubmit={handleSendMessage} className="flex items-end space-x-3">
          <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-3 focus-within:border-accent transition-colors">
            <div className="flex items-center space-x-2">
              <button
                type="button"
                className="p-2 hover:bg-white/5 rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                <Smile className="w-5 h-5 text-text-secondary" />
              </button>
              <input
                type="text"
                value={newMessage}
                onChange={handleTyping}
                placeholder="Type a message..."
                className="flex-1 bg-transparent text-text-primary placeholder:text-text-muted focus:outline-none text-base"
              />
              <button
                type="button"
                className="p-2 hover:bg-white/5 rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                <Paperclip className="w-5 h-5 text-text-secondary" />
              </button>
            </div>
          </div>
          <GradientButton
            type="submit"
            disabled={!newMessage.trim()}
            className="rounded-2xl p-3 min-h-[52px] min-w-[52px] flex items-center justify-center"
          >
            <Send className="w-5 h-5" />
          </GradientButton>
        </form>
      </motion.div>
    </div>
  );
};

export default ChatBox;
