import Image from 'next/image';
import { cn } from '@/lib/utils';

interface ActionButtonProps {
  content: string;
  icon: string;
  onClick: () => void;
  disabled?: boolean;
}

const ActionButton = ({
  content,
  icon,
  onClick,
  disabled
}: ActionButtonProps) => {
  return (
    <button
      className={cn(
        'flex items-center gap-4 rounded-14 p-3',
        disabled
          ? 'cursor-not-allowed bg-gr-50 text-gr-300'
          : 'bg-gr-white active:bg-gr-50'
      )}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
    >
      <Image
        src={icon}
        alt="icon"
        width={24}
        height={24}
        className={disabled ? 'opacity-50' : ''}
      />
      <p
        className={cn('text-body-2', disabled ? 'text-gr-300' : 'text-gr-900')}
      >
        {content}
      </p>
    </button>
  );
};

export default ActionButton;
