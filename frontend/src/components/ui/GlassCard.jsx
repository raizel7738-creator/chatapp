import { cn } from '../../utils/cn';

const GlassCard = ({ children, className, hover = false, ...props }) => {
  return (
    <div
      className={cn(
        'bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl',
        hover && 'transition-all duration-200 hover:bg-white/7 hover:border-white/15',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default GlassCard;
