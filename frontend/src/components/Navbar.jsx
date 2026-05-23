import { useContext } from 'react';
import { motion } from 'framer-motion';
import { LogOut, Search, Users } from 'lucide-react';
import { AuthContext } from '../context/AuthContext.jsx';
import Avatar from './ui/Avatar';
import GradientButton from './ui/GradientButton';

const Navbar = ({ onSearchClick }) => {
  const { user, logout } = useContext(AuthContext);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 bg-surface/80 backdrop-blur-xl border-b border-white/10"
    >
      <div className="px-4 md:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl md:text-2xl font-display font-bold gradient-text">
            ChatApp
          </h1>
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
          <div className="hidden md:flex items-center space-x-3 px-3 py-2 bg-white/5 rounded-xl border border-white/10">
            <Avatar
              src={user?.avatar}
              alt={user?.name}
              name={user?.name}
              size="sm"
              online={true}
            />
            <div className="flex flex-col">
              <span className="text-sm font-medium text-text-primary">{user?.name}</span>
              <span className="text-xs text-text-muted">Online</span>
            </div>
          </div>

          <button
            onClick={onSearchClick}
            className="md:hidden p-2 hover:bg-white/5 rounded-xl transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            <Search className="w-5 h-5 text-text-secondary" />
          </button>

          <GradientButton
            onClick={logout}
            variant="ghost"
            size="sm"
            className="flex items-center space-x-2"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden md:inline">Logout</span>
          </GradientButton>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
