import Image from 'next/image';

interface ActionButtonProps {
  content: string;
  icon: string;
}

const ActionButton = ({ content, icon }: ActionButtonProps) => {
  return (
    <button className="flex justfy-center items-center gap-4 bg-gr-white active:bg-gr-50 p-3 rounded-14">
      <Image src={icon} alt="icon" width={24} height={24} />
      <p className="text-gr-900 text-body-2">{content}</p>
    </button>
  );
};

export default ActionButton;
