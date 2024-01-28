import Image from 'next/image';

interface FloatingActionButtonProps {
  onClick: () => void;
}

const FloatingActionButton = ({ onClick }: FloatingActionButtonProps) => {
  return (
    <button
      className="fixed bottom-[100px] right-5 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-pr-500"
      onClick={onClick}
    >
      <Image src="/images/icons/plus.svg" alt="icon" width={24} height={24} />
    </button>
  );
};

export default FloatingActionButton;
