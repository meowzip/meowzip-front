interface LabelProps {
  type: 'default' | 'text' | 'icon';
  content?: string;
  icon?: string;
}

const labelTypeVariants = {
  default: 'flex items-center justify-center rounded-md py-[2px] pr-1 pl-[2px]',
  text: 'rounded-md p-[4px]',
  icon: 'w-5 h-5 flex items-center justify-center rounded-full'
};

const Label = ({ type, content, icon }: LabelProps) => {
  return (
    <div className={`bg-gr-50 ${labelTypeVariants[type]}`}>
      {icon && <img src={icon} alt="label-icon" className="h-5 w-5 p-[2px]" />}
      {content && <p className="text-body-4 text-gr-600">{content}</p>}
    </div>
  );
};

export default Label;
