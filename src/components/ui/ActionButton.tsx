import Image from 'next/image';

interface ActionButtonProps {
  content: string;
  icon: string;
  onClick: () => void;
}

const ActionButton = ({ content, icon, onClick }: ActionButtonProps) => {
  return (
    <button
      className="justfy-center flex items-center gap-4 rounded-14 bg-gr-white p-3 active:bg-gr-50"
      onClick={onClick}
    >
      <Image src={icon} alt="icon" width={24} height={24} />
      <p className="text-body-2 text-gr-900">{content}</p>
    </button>
  );
};

export default ActionButton;
