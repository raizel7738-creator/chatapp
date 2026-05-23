import { motion } from 'framer-motion';
import { Check, CheckCheck } from 'lucide-react';
import Avatar from './Avatar';

const MessageBubble = ({ message, isOwn }) => {
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={`flex items-end space-x-2 max-w-md ${isOwn ? 'ml-auto flex-row-reverse space-x-reverse' : ''}`}
    >
      <Avatar
        src={message.sender.avatar}
        alt={message.sender.name}
        name={message.sender.name}
        size="sm"
        className="flex-shrink-0"
      />
      <div className="flex flex-col">
        {!isOwn && (
          <span className="text-xs text-text-muted mb-1 px-2">{message.sender.name}</span>
        )}
        <div
          className={`px-4 py-2.5 rounded-2xl ${
            isOwn
              ? 'bg-gradient-to-br from-indigo-500 to-violet-600 text-white rounded-br-sm shadow-lg shadow-indigo-500/20'
              : 'bg-white/8 backdrop-blur border border-white/10 text-text-primary rounded-bl-sm'
          }`}
        >
          <p className="text-base leading-relaxed break-words">{message.content}</p>
        </div>
        <div className={`flex items-center space-x-1 mt-1 px-2 ${isOwn ? 'justify-end' : ''}`}>
          <span className="text-xs text-text-muted">{formatTime(message.createdAt)}</span>
          {isOwn && (
            <CheckCheck className="w-3 h-3 text-text-muted" />
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default MessageBubble;
