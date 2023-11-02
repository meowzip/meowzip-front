interface BagdeProps {
  type: 'default' | 'text' | 'icon';
  text?: string;
  icon?: string;
  color: string;
}

const badgeTypeVariants = {
  default: 'w-2 h-2 rounded-full',
  text: 'w-5 h-5 text-btn-3 px-2 py-1 rounded-full',
  icon: 'w-5 h-5 rounded-full'
};

const Badge = ({ type, text, icon, color }: BagdeProps) => {
  return (
    <div
      className={`flex items-center justify-center ${color} ${badgeTypeVariants[type]}`}
    >
      {icon && <img src={icon} alt="label-icon" />}
      {text && <p className={`text-btn-3 text-gr-white`}>{text}</p>}
    </div>
  );
};

export default Badge;
