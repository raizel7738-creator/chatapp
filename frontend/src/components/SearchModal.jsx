import { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, Loader2 } from 'lucide-react';
import { ChatContext } from '../context/ChatContext.jsx';
import Avatar from './ui/Avatar';
import GradientButton from './ui/GradientButton';
import GlassCard from './ui/GlassCard';

const SearchModal = ({ onClose }) => {
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const { searchUsers, createChat } = useContext(ChatContext);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search.trim()) return;

    setLoading(true);
    const results = await searchUsers(search);
    setSearchResults(results);
    setLoading(false);
  };

  const handleSelectUser = async (userId) => {
    await createChat(userId);
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ type: 'spring', duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-lg"
        >
          <GlassCard className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-display font-bold text-text-primary">
                Find Users
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-xl transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                <X className="w-5 h-5 text-text-secondary" />
              </button>
            </div>

            <form onSubmit={handleSearch} className="mb-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by name or email..."
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-base text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors"
                  autoFocus
                />
              </div>
              <GradientButton
                type="submit"
                className="w-full mt-3"
                loading={loading}
              >
                Search
              </GradientButton>
            </form>

            <div className="max-h-96 overflow-y-auto space-y-2">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-12 space-y-3">
                  <Loader2 className="w-8 h-8 text-accent animate-spin" />
                  <p className="text-text-muted text-sm">Searching...</p>
                </div>
              ) : searchResults.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-3">
                    <Search className="w-8 h-8 text-text-muted" />
                  </div>
                  <p className="text-text-muted text-sm">
                    {search ? 'No users found' : 'Enter a name or email to search'}
                  </p>
                </div>
              ) : (
                <motion.div
                  initial="hidden"
                  animate="show"
                  variants={{
                    hidden: { opacity: 0 },
                    show: {
                      opacity: 1,
                      transition: { staggerChildren: 0.05 },
                    },
                  }}
                >
                  {searchResults.map((user) => (
                    <motion.div
                      key={user._id}
                      variants={{
                        hidden: { opacity: 0, y: 10 },
                        show: { opacity: 1, y: 0 },
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <button
                        onClick={() => handleSelectUser(user._id)}
                        className="w-full flex items-center space-x-3 p-3 hover:bg-white/5 rounded-xl transition-colors text-left"
                      >
                        <Avatar
                          src={user.avatar}
                          alt={user.name}
                          name={user.name}
                          size="lg"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-text-primary truncate">
                            {user.name}
                          </h3>
                          <p className="text-sm text-text-muted truncate">{user.email}</p>
                        </div>
                      </button>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </div>
          </GlassCard>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SearchModal;
