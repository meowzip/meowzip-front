interface LabelProps {
  type: 'default' | 'text' | 'icon' | 'badge';
  content?: string;
  children?: React.ReactNode;
}

const labelTypeVariants = {
  default: 'flex items-center justify-center rounded-md py-[2px] pr-1 pl-[2px]',
  text: 'rounded-md p-[4px]',
  icon: 'w-fit h-6 flex items-center justify-between rounded-[6px] px-[6px] pt-[5px] pb-1',
  badge: 'rounded-md p-[4px] bg-sm-confirm-50 p-1'
};

const Label = ({ type, content, children }: LabelProps) => {
  return (
    <div className={`bg-gr-50 ${labelTypeVariants[type]}`}>
      {children && <p className="pr-1">{children}</p>}
      {content && (
        <p
          className={`text-body-4 text-gr-600 ${
            type === 'badge' && 'text-xs text-sm-confirm-500'
          }`}
        >
          {content}
        </p>
      )}
    </div>
  );
};

export default Label;
