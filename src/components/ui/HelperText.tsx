import * as React from 'react';
import { cn } from '@/lib/utils';

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
  return (
    <span
      className={cn(
        'rounded-[4px] px-[8px] py-[2px] text-sm',
        {
          'bg-sm-error-50 text-sm-error-500': isError,
          'bg-pr-50 text-sm-info-500': !isError
        },
        className
      )}
    >
      {text}
    </span>
  );
};

export default HelperText;
