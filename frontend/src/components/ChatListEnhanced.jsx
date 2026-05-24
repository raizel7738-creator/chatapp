import { useContext, useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Filter, Users, UserPlus, MessageSquareDot, Star, 
  CircleUserRound, CircleOff, MessageSquareDashed, ChevronDown, X 
} from 'lucide-react';
import { ChatContext } from '../context/ChatContext.jsx';
import { AuthContext } from '../context/AuthContext.jsx';
import Avatar from './ui/Avatar';

const ChatListEnhanced = () => {
  const { chats, selectedChat, setSelectedChat } = useContext(ChatContext);
  const { user } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const filterMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterMenuRef.current && !filterMenuRef.current.contains(event.target)) {
        setShowFilterMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

  const filteredChats = chats.filter((chat) => {
    const chatName = getChatName(chat).toLowerCase();
    const matchesSearch = chatName.includes(searchQuery.toLowerCase());
    
    // Add filter logic here based on activeFilter
    return matchesSearch;
  });

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

  const filterOptions = [
    { id: 'all', label: 'All Chats', icon: MessageSquareDot },
    { id: 'unread', label: 'Unread', icon: MessageSquareDot },
    { id: 'favorites', label: 'Favorites', icon: Star },
    { id: 'contacts', label: 'Contacts', icon: CircleUserRound },
    { id: 'non-contacts', label: 'Non Contacts', icon: CircleOff },
    { id: 'groups', label: 'Groups', icon: Users },
    { id: 'drafts', label: 'Drafts', icon: MessageSquareDashed },
  ];

  return (
    <div className="w-full h-full bg-surface border-r border-white/10 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-text-primary">Chats</h2>
          <div className="flex items-center space-x-2">
            {/* New Chat Button */}
            <button
              className="p-2 hover:bg-white/5 rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              title="New Chat"
            >
              <UserPlus className="w-5 h-5 text-text-secondary" />
            </button>

            {/* Filter Button */}
            <div className="relative" ref={filterMenuRef}>
              <button
                onClick={() => setShowFilterMenu(!showFilterMenu)}
                className="p-2 hover:bg-white/5 rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center relative"
                title="Filter Chats"
              >
                <Filter className="w-5 h-5 text-text-secondary" />
                {activeFilter !== 'all' && (
                  <div className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
                )}
              </button>

              <AnimatePresence>
                {showFilterMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-56 bg-surface-card backdrop-blur-xl border border-white/10 rounded-xl shadow-xl overflow-hidden z-50"
                  >
                    <div className="p-2">
                      <div className="px-3 py-2 border-b border-white/10 mb-2">
                        <p className="text-xs font-medium text-text-muted uppercase tracking-wide">
                          Filter Chats By
                        </p>
                      </div>
                      {filterOptions.map((option) => {
                        const Icon = option.icon;
                        return (
                          <button
                            key={option.id}
                            onClick={() => {
                              setActiveFilter(option.id);
                              setShowFilterMenu(false);
                            }}
                            className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors text-left ${
                              activeFilter === option.id
                                ? 'bg-accent/10 text-accent'
                                : 'hover:bg-white/5 text-text-primary'
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                            <span className="text-sm font-medium">{option.label}</span>
                            {activeFilter === option.id && (
                              <div className="ml-auto w-2 h-2 bg-accent rounded-full" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search conversations..."
            className="w-full pl-10 pr-10 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-3 h-3 text-text-muted" />
            </button>
          )}
        </div>

        {/* Active Filter Badge */}
        {activeFilter !== 'all' && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 flex items-center space-x-2"
          >
            <div className="flex items-center space-x-2 px-3 py-1.5 bg-accent/10 border border-accent/20 rounded-lg">
              <span className="text-xs font-medium text-accent">
                {filterOptions.find((f) => f.id === activeFilter)?.label}
              </span>
              <button
                onClick={() => setActiveFilter('all')}
                className="p-0.5 hover:bg-accent/20 rounded-full transition-colors"
              >
                <X className="w-3 h-3 text-accent" />
              </button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {filteredChats.length === 0 ? (
          <div className="p-6 text-center">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-3">
              <MessageSquareDot className="w-8 h-8 text-text-muted" />
            </div>
            <p className="text-text-muted text-sm">
              {searchQuery ? 'No chats found' : 'No conversations yet'}
            </p>
            <p className="text-text-muted text-xs mt-1">
              {searchQuery ? 'Try a different search' : 'Search for users to start chatting!'}
            </p>
          </div>
        ) : (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="p-2 space-y-1"
          >
            {filteredChats.map((chat) => (
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
                    <div className="relative">
                      <Avatar
                        src={getChatAvatar(chat)}
                        name={getChatName(chat)}
                        size="md"
                        online={false}
                      />
                      {/* Unread Badge */}
                      {/* <div className="absolute -top-1 -right-1 w-5 h-5 bg-accent rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-white">3</span>
                      </div> */}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-medium text-text-primary truncate text-sm">
                          {getChatName(chat)}
                        </h3>
                        {chat.latestMessage && (
                          <span className="text-xs text-text-muted ml-2 flex-shrink-0">
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

export default ChatListEnhanced;
