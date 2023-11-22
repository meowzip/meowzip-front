import Image from 'next/image';

interface FloatingActionButtonProps {
  image: string;
  onClick: () => void;
}

const FloatingActionButton = ({
  image,
  onClick
}: FloatingActionButtonProps) => {
  return (
    <button
      className="fixed bottom-5 right-5 z-10 flex h-12 w-12 items-center justify-center rounded-full border bg-gr-white"
      onClick={onClick}
    >
      <Image src={image} alt="icon" width={48} height={48} />
    </button>
  );
};

export default FloatingActionButton;
