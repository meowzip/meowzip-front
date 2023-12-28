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
      className={`rounded-[20px] border-12 px-[14px] py-[5px] text-btn-2  ${
        icon && 'flex items-center gap-1'
      } ${
        propObj.checked
          ? 'border-pr-500 bg-gr-white text-pr-500'
          : 'border-gr-50 bg-gr-50 text-gr-500'
      }`}
      onClick={onClick}
    >
      {icon && (
        <Image
          src={icon}
          alt="icon"
          width={20}
          height={20}
          className="h-5 w-5"
        />
      )}
      <p>{propObj.content}</p>
    </button>
  );
};

export default Chip;
