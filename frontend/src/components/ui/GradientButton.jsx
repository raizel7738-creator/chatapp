import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { cn } from '../../utils/cn';

const GradientButton = ({
  children,
  loading = false,
  disabled = false,
  variant = 'primary',
  size = 'md',
  className,
  ...props
}) => {
  const variants = {
    primary: 'bg-gradient-to-r from-indigo-500 to-violet-600 text-white hover:brightness-110 shadow-lg shadow-indigo-500/20',
    secondary: 'bg-white/5 text-text-primary hover:bg-white/10 border border-white/10',
    ghost: 'text-text-secondary hover:bg-white/5 hover:text-text-primary',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <motion.button
      whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
      className={cn(
        'rounded-xl font-medium transition-all duration-200',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'focus:outline-none focus:ring-2 focus:ring-accent/50',
        'min-h-[44px] min-w-[44px]',
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <Loader2 className="w-5 h-5 animate-spin mx-auto" />
      ) : (
        children
      )}
    </motion.button>
  );
};

export default GradientButton;
