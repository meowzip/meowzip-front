import Image from 'next/image';

interface SettingCardProps {
  text: string;
  onClick: () => void;
}

const SettingCard = ({ text, onClick }: SettingCardProps) => {
  return (
    <div className="flex items-center justify-between py-4 pl-5 pr-4">
      <h1 className="text-btn-1 text-gr-800">{text}</h1>
      <Image
        src="/images/icons/right.svg"
        alt="arrow"
        width={24}
        height={24}
        className="h-6 w-6"
        onClick={onClick}
      />
    </div>
  );
};

export default SettingCard;
