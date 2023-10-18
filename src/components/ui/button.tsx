import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md disabled:pointer-events-none',
  {
    variants: {
      variant: {
        primary: 'bg-pr-500 text-gr-10 disabled:bg-gr-200',
        secondary:
          'border border-input bg-gr-white border border-gr-100 text-gr-800',
        thirdary: 'bg-pr-500 text-gr-white active:border active:border-pr-500',
        outline:
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground'
      },
      size: {
        lg: 'rounded-lg px-4 py-2 text-btn-1',
        md: 'rounded-full px-4 py-[5px] text-btn-2',
        sm: 'rounded-full px-3 py-2 text-btn-3 leading-none',
        icon: 'rounded-md h-6 w-6 p-[6px]'
      }
    },
    defaultVariants: {
      variant: 'primary',
      size: 'lg'
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
