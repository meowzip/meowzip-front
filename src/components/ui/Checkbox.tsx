import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import CheckIcon from '../../../public/images/icons/check.svg';

import { cn } from '@/lib/utils';

export interface CheckboxProps {
  id: string;
  kind: 'hasBg' | 'noBg';
  isChecked: boolean;
  onClick: () => void;
}

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> & CheckboxProps
>(({ className, kind, isChecked, onClick, ...props }, ref) => {
  return (
    <CheckboxPrimitive.Root
      ref={ref}
      className={cn(
        'peer h-5 w-5 shrink-0 rounded-md focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
        kind === 'hasBg'
          ? 'bg-gr-100 data-[state=checked]:bg-pr-500'
          : 'bg-gr-white',
        className
      )}
      checked={isChecked}
      {...props}
      onClick={onClick}
    >
      <div className="flex items-center justify-center text-current">
        <CheckIcon
          width={16}
          height={16}
          fill={`${
            kind === 'hasBg'
              ? 'var(--gr-white)'
              : isChecked
              ? 'var(--pr-500)'
              : 'var(--gr-100)'
          }`}
        />
      </div>
    </CheckboxPrimitive.Root>
  );
});
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
