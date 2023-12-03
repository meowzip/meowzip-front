import * as React from 'react';
import { cn } from '@/lib/utils';
import HelperText from './HelperText';

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'> {
  variant?: 'default' | 'outlined' | 'filled' | 'search';
  inputSize?: 'small' | 'medium' | 'large';
  iconStart?: React.ReactNode;
  iconEnd?: React.ReactNode;
  onClear?: () => void;
  // validator: () => void;
  error?: boolean;
  helperText?: string;
  loading?: boolean;
  mask?: string;
  formatter?: (value: string) => string;
  parser?: (value: string) => any;
  prefix?: string | React.ReactNode;
  suffix?: string | React.ReactNode;
  autocomplete?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant,
      inputSize,
      iconStart,
      iconEnd,
      onClear,
      // validator,
      error,
      helperText,
      loading,
      mask,
      formatter,
      parser,
      prefix,
      suffix,
      autocomplete,
      placeholder,
      type = 'text',
      ...props
    },
    ref
  ) => {
    const sizeClass = inputSize ? `input-${inputSize}` : '';
    const inputClassName = cn(
      'flex h-10 w-full rounded-md px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-gr-50 focus:border-2 focus:border-pr-500',
      {
        'border-input bg-background': variant !== 'outlined',
        'focus:border-sm-error-500': error,
        'border-none': variant === 'search'
      },
      sizeClass,
      className
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let value = e.target.value;
      if (formatter) {
        value = formatter(value);
      }
      if (parser) {
        value = parser(value);
      }
      props.onChange?.(e);
    };

    return (
      <div className="relative">
        {prefix && (
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            {prefix}
          </span>
        )}
        <input
          type={type}
          className={inputClassName}
          ref={ref}
          placeholder={placeholder}
          onChange={handleChange}
          autoComplete={autocomplete}
          {...props}
        />
        {suffix && (
          <span className="absolute inset-y-0 right-0 flex items-center pr-3">
            {suffix}
          </span>
        )}
        {iconStart && (
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            {iconStart}
          </span>
        )}
        {iconEnd && (
          <span className="absolute inset-y-0 right-0 flex items-center pr-3">
            {iconEnd}
          </span>
        )}
        {loading && <span>Loading...</span>}
        {helperText && <HelperText text={helperText} isError={error} />}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
