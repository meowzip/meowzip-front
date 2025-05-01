import * as React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface HelperTextProps {
  text: string;
  isError?: boolean;
  className?: string;
}

const HelperText: React.FC<HelperTextProps> = ({
  text,
  isError,
  className
}) => {
  const variants = {
    hidden: { opacity: 0, y: -5 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -5 }
  };

  return (
    <motion.span
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={variants}
      transition={{ duration: 0.2 }}
      className={cn(
        'mt-1 block max-w-fit rounded-[4px] px-[8px] py-[2px] text-sm',
        {
          'bg-sm-error-50 text-sm-error-500': isError,
          'bg-pr-50 text-sm-info-500': !isError
        },
        className
      )}
    >
      {text}
    </motion.span>
  );
};

export default HelperText;
