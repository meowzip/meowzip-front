import Image from 'next/image';

interface FloatingActionButtonProps {
  image: string;
}

const FloatingActionButton = ({ image }: FloatingActionButtonProps) => {
  return (
    <button className="fixed z-10 bottom-5 right-5 w-12 h-12 rounded-full border bg-gr-white flex justify-center items-center">
      <Image src={image} alt="icon" width={48} height={48} />
    </button>
  );
};

export default FloatingActionButton;
