interface BagdeProps {
  type: 'default' | 'text' | 'icon';
  text?: string;
  icon?: string;
  bgColor?: string;
  textColor?: string;
}

const badgeTypeVariants = {
  default: 'w-2 h-2 rounded-full',
  text: 'w-5 h-5 text-btn-3 px-2 py-1 rounded-full',
  icon: 'w-4 h-4 rounded-full'
};

const Badge = ({ type, text, icon, bgColor, textColor }: BagdeProps) => {
  return (
    <div
      className={`flex items-center justify-center ${bgColor} ${badgeTypeVariants[type]}`}
    >
      {icon && <img src={icon} alt="label-icon" />}
      {text && (
        <p className={`text-btn-3 text-gr-white ${textColor}`}>{text}</p>
      )}
    </div>
  );
};

export default Badge;
