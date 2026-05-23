import { useContext } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { ChatContext } from '../context/ChatContext.jsx';
import { AuthContext } from '../context/AuthContext.jsx';
import Avatar from './ui/Avatar';
import GlassCard from './ui/GlassCard';

const ChatList = () => {
  const { chats, selectedChat, setSelectedChat } = useContext(ChatContext);
  const { user } = useContext(AuthContext);

  const getChatName = (chat) => {
    if (chat.isGroupChat) {
      return chat.chatName;
    }
    const otherUser = chat.users.find((u) => u._id !== user._id);
    return otherUser?.name || 'Unknown User';
  };

  const getChatAvatar = (chat) => {
    if (chat.isGroupChat) {
      return null;
    }
    const otherUser = chat.users.find((u) => u._id !== user._id);
    return otherUser?.avatar;
  };

  const getLatestMessage = (chat) => {
    if (!chat.latestMessage) return 'No messages yet';
    const content = chat.latestMessage.content;
    return content.length > 40 ? content.substring(0, 40) + '...' : content;
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 },
  };

  return (
    <div className="w-full md:w-80 bg-surface border-r border-white/10 flex flex-col h-full">
      {/* Search Bar */}
      <div className="p-4 border-b border-white/10">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <input
            type="text"
            placeholder="Search conversations..."
            className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors"
          />
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {chats.length === 0 ? (
          <div className="p-6 text-center">
            <p className="text-text-muted text-sm">No conversations yet</p>
            <p className="text-text-muted text-xs mt-1">Search for users to start chatting!</p>
          </div>
        ) : (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="p-2 space-y-1"
          >
            {chats.map((chat) => (
              <motion.div
                key={chat._id}
                variants={item}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <button
                  onClick={() => setSelectedChat(chat)}
                  className={`w-full p-3 rounded-xl transition-all duration-200 text-left ${
                    selectedChat?._id === chat._id
                      ? 'bg-accent/10 border-l-2 border-accent'
                      : 'hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Avatar
                      src={getChatAvatar(chat)}
                      name={getChatName(chat)}
                      size="md"
                      online={false}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-medium text-text-primary truncate text-sm">
                          {getChatName(chat)}
                        </h3>
                        {chat.latestMessage && (
                          <span className="text-xs text-text-muted ml-2">
                            {new Date(chat.latestMessage.createdAt).toLocaleTimeString('en-US', {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-text-muted truncate">
                        {getLatestMessage(chat)}
                      </p>
                    </div>
                  </div>
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ChatList;
