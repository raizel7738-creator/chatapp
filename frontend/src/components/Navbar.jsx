import { useContext, useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LogOut, Search, Users, Settings, User, Moon, Bell, ChevronDown, MessageSquare 
} from 'lucide-react';
import { AuthContext } from '../context/AuthContext.jsx';
import Avatar from './ui/Avatar';
import GradientButton from './ui/GradientButton';

const Navbar = ({ onSearchClick }) => {
  const { user, logout } = useContext(AuthContext);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 bg-surface/80 backdrop-blur-xl border-b border-white/10"
    >
      <div className="px-4 md:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-accent-light flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl md:text-2xl font-display font-bold gradient-text">
              ChatApp
            </h1>
          </div>
          <GradientButton
            onClick={onSearchClick}
            variant="secondary"
            size="sm"
            className="hidden md:flex items-center space-x-2"
          >
            <Users className="w-4 h-4" />
            <span>Find Users</span>
          </GradientButton>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={onSearchClick}
            className="md:hidden p-2 hover:bg-white/5 rounded-xl transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            <Search className="w-5 h-5 text-text-secondary" />
          </button>

          {/* User Menu Dropdown */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-2 md:space-x-3 px-2 md:px-3 py-2 bg-white/5 rounded-xl border border-white/10 hover:bg-white/7 transition-colors min-h-[44px]"
            >
              <Avatar
                src={user?.avatar}
                name={user?.name}
                size="sm"
                online={true}
              />
              <div className="hidden md:flex flex-col text-left">
                <span className="text-sm font-medium text-text-primary">{user?.name}</span>
                <span className="text-xs text-text-muted">Online</span>
              </div>
              <ChevronDown 
                className={`w-4 h-4 text-text-secondary transition-transform duration-200 ${
                  showUserMenu ? 'rotate-180' : ''
                }`} 
              />
            </button>

            <AnimatePresence>
              {showUserMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-64 bg-surface-card backdrop-blur-xl border border-white/10 rounded-xl shadow-xl overflow-hidden"
                >
                  {/* User Info */}
                  <div className="p-4 border-b border-white/10 bg-white/5">
                    <div className="flex items-center space-x-3">
                      <Avatar
                        src={user?.avatar}
                        name={user?.name}
                        size="md"
                        online={true}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-text-primary truncate">{user?.name}</p>
                        <p className="text-xs text-text-muted truncate">{user?.email}</p>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="p-2">
                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        // Add profile functionality
                      }}
                      className="w-full flex items-center space-x-3 px-3 py-2.5 hover:bg-white/5 rounded-lg transition-colors text-left group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                        <User className="w-4 h-4 text-text-secondary group-hover:text-accent transition-colors" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-text-primary">Profile</p>
                        <p className="text-xs text-text-muted">View your profile</p>
                      </div>
                    </button>

                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        // Add settings functionality
                      }}
                      className="w-full flex items-center space-x-3 px-3 py-2.5 hover:bg-white/5 rounded-lg transition-colors text-left group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                        <Settings className="w-4 h-4 text-text-secondary group-hover:text-accent transition-colors" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-text-primary">Settings</p>
                        <p className="text-xs text-text-muted">Preferences & privacy</p>
                      </div>
                    </button>

                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        // Add notifications functionality
                      }}
                      className="w-full flex items-center space-x-3 px-3 py-2.5 hover:bg-white/5 rounded-lg transition-colors text-left group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                        <Bell className="w-4 h-4 text-text-secondary group-hover:text-accent transition-colors" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-text-primary">Notifications</p>
                        <p className="text-xs text-text-muted">Manage alerts</p>
                      </div>
                    </button>

                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        // Add theme toggle functionality
                      }}
                      className="w-full flex items-center space-x-3 px-3 py-2.5 hover:bg-white/5 rounded-lg transition-colors text-left group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                        <Moon className="w-4 h-4 text-text-secondary group-hover:text-accent transition-colors" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-text-primary">Appearance</p>
                        <p className="text-xs text-text-muted">Dark mode enabled</p>
                      </div>
                    </button>
                  </div>

                  {/* Logout */}
                  <div className="p-2 border-t border-white/10">
                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        logout();
                      }}
                      className="w-full flex items-center space-x-3 px-3 py-2.5 hover:bg-red-500/10 rounded-lg transition-colors text-left group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center group-hover:bg-red-500/20 transition-colors">
                        <LogOut className="w-4 h-4 text-red-400" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-red-400">Logout</p>
                        <p className="text-xs text-red-400/70">Sign out of your account</p>
                      </div>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
