import { Slot } from '@radix-ui/react-slot';
import { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import Image from 'next/image';
import clsx from 'clsx';

const buttonVariants = cva(
  'inline-flex items-center justify-center disabled:pointer-events-none',
  {
    variants: {
      variant: {
        primary: 'bg-pr-500 text-gr-10 disabled:bg-gr-200',
        secondary: 'bg-gr-white text-gr-800 border border-gr-100',
        tertiary:
          'bg-gr-50 text-gr-300 border-16 border-gr-50 w-[106px] rounded-lg',
        tertiaryReverse:
          'bg-gr-50 text-gr-300 border-16 border-gr-50 w-[106px] rounded-lg bg-gr-white text-pr-500 border-[1.6px] border-pr-500',
        outline: 'bg-gr-white text-pr-500 border border-pr-500',
        text: 'disabled:text-gr-200'
      },
      size: {
        lg: 'rounded-16 px-4 py-2 text-btn-1',
        md: 'rounded-full px-4 py-[5px] text-btn-2',
        sm: 'rounded-full px-3 py-2 text-btn-3',
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
  icon?: string;
  isActive?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      icon,
      onClick,
      asChild = false,
      isActive,
      ...props
    },
    ref
  ) => {
    const handleClick = (
      event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      if (onClick) onClick(event);
    };

    const Comp = asChild ? Slot : 'button';

    return (
      <div className="flex items-center justify-center">
        <Comp
          className={clsx(buttonVariants({ variant, size }), className)}
          ref={ref}
          onClick={handleClick}
          {...props}
        >
          {props.children}
        </Comp>
        {icon && <Image src={icon} alt="icon" width={24} height={24} />}
      </div>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
