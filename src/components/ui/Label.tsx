import { cn } from '@/lib/utils';
import { HTMLAttributes } from 'react';

interface LabelProps {
  content?: string;
  src?: string;
}

const labelTypeVariants = {
  text: 'rounded-md p-1',
  icon: 'w-fit h-6 flex items-center justify-between rounded-[6px] px-[6px] pt-[5px] pb-1',
  default: 'flex items-center rounded-md py-[2px] pr-1 pl-[2px]'
};

const Text = ({ content, className }: HTMLAttributes<HTMLSpanElement>) => {
  return (
    <div className={cn(labelTypeVariants['text'], className)}>
      <p className="text-btn-3">{content}</p>
    </div>
  );
};

const Icon = ({ src }: LabelProps & HTMLAttributes<HTMLSpanElement>) => (
  <img src={src} className="h-4 w-4" />
);

const Default = ({
  content,
  className,
  children
}: LabelProps & HTMLAttributes<HTMLSpanElement>) => {
  return (
    <div className={cn(labelTypeVariants['default'], className)}>
      {children}
      <p className="text-btn-3">{content}</p>
    </div>
  );
};

const Label = ({
  src,
  content,
  children,
  className,
  ...props
}: LabelProps & HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn(className)} {...props}>
      {children}
    </div>
  );
};

export default Object.assign(Label, { Text, Icon, Default });
