import { cn } from '../../utils/cn';

const Avatar = ({ src, alt, name, size = 'md', online = false, className }) => {
  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-lg',
  };

  const getInitials = (name) => {
    if (!name) return '?';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className={cn('relative inline-block', className)}>
      <div
        className={cn(
          'rounded-full flex items-center justify-center font-medium overflow-hidden',
          'bg-gradient-to-br from-indigo-500 to-violet-600',
          'ring-2 ring-surface-border',
          sizes[size]
        )}
      >
        {src ? (
          <img src={src} alt={alt || name} className="w-full h-full object-cover" />
        ) : (
          <span className="text-white">{getInitials(name)}</span>
        )}
      </div>
      {online && (
        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-surface animate-pulse" />
      )}
    </div>
  );
};

export default Avatar;
