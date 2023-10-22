import Image from 'next/image';

interface ChipProps {
  propObj: {
    key: string;
    content: string;
    checked: boolean;
  };
  icon?: string;
  onClick: () => void;
}

const Chip = ({ propObj, icon, onClick }: ChipProps) => {
  return (
    <button
      id={propObj.key}
      className={`px-[14px] py-[5px] border-12 rounded-[20px] text-btn-2  ${
        icon && 'flex items-center gap-1'
      } ${
        propObj.checked
          ? 'text-pr-500 bg-gr-white border-pr-500'
          : 'text-gr-500 bg-gr-50 border-gr-50'
      }`}
      onClick={onClick}
    >
      {icon && (
        <Image
          src={icon}
          alt="icon"
          width={20}
          height={20}
          className="w-5 h-5"
        />
      )}
      <p>{propObj.content}</p>
    </button>
  );
};

export default Chip;
