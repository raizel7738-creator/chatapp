import { motion } from 'framer-motion';

const TypingIndicator = () => {
  const dotVariants = {
    initial: { y: 0 },
    animate: { y: -6 },
  };

  const dotTransition = {
    duration: 0.5,
    repeat: Infinity,
    repeatType: 'reverse',
    ease: 'easeInOut',
  };

  return (
    <div className="flex items-center space-x-1 px-4 py-3 bg-white/8 backdrop-blur border border-white/10 rounded-2xl rounded-bl-sm w-fit">
      <motion.div
        className="w-2 h-2 bg-text-secondary rounded-full"
        variants={dotVariants}
        initial="initial"
        animate="animate"
        transition={{ ...dotTransition, delay: 0 }}
      />
      <motion.div
        className="w-2 h-2 bg-text-secondary rounded-full"
        variants={dotVariants}
        initial="initial"
        animate="animate"
        transition={{ ...dotTransition, delay: 0.2 }}
      />
      <motion.div
        className="w-2 h-2 bg-text-secondary rounded-full"
        variants={dotVariants}
        initial="initial"
        animate="animate"
        transition={{ ...dotTransition, delay: 0.4 }}
      />
    </div>
  );
};

export default TypingIndicator;
