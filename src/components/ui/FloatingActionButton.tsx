// src/components/ui/FloatingActionButton.tsx
import Image from 'next/image';
import Link from 'next/link';

interface FloatingActionButtonProps {
  href?: string;
}

const FloatingActionButton = ({ href }: FloatingActionButtonProps) => {
  const buttonContent = (
    <div className="fixed bottom-[160px] left-1/2 z-10 w-full max-w-[640px] -translate-x-1/2 transform">
      <button
        className="absolute right-5 flex h-12 w-12 items-center justify-center rounded-full bg-pr-500 transition-all duration-200 hover:scale-110 active:scale-95"
        aria-label="새 글 작성"
      >
        <Image src="/images/icons/plus.svg" alt="icon" width={24} height={24} />
      </button>
    </div>
  );

  return href ? (
    <Link href={href} scroll={false} passHref>
      {buttonContent}
    </Link>
  ) : (
    buttonContent
  );
};

export default FloatingActionButton;
