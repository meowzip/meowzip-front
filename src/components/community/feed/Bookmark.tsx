import { motion } from 'framer-motion';
import '@/components/community/feed/bookmark.css';

interface BookmarkProps {
  isBookmarked: boolean;
  toggleBookmark: () => void;
}

export default function Bookmark({
  isBookmarked,
  toggleBookmark
}: BookmarkProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleBookmark();
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    const button = e.currentTarget;
    if (!button.classList.contains('marked')) {
      return;
    }

    button.querySelectorAll('.default, .filled').forEach(path => {
      path.setAttribute(
        'd',
        'M26 6H10V18C10 22.6863 11 28 11 28C11 28 17.5273 19.5 18 19.5C18.4727 19.5 25 28 25 28C25 28 26 22.6863 26 18V6Z'
      );
    });
  };

  return (
    <div className="h-6 w-6">
      <motion.button
        onClick={handleClick}
        onPointerDown={handlePointerDown}
        className="bookmark focus:outline-none"
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <motion.svg
          viewBox="0 0 36 36"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.path
            className={isBookmarked ? 'filled' : 'default'}
            d={
              isBookmarked
                ? 'M26 6H10V18V30C10 30 17.9746 23.5 18 23.5C18.0254 23.5 26 30 26 30V18V6Z'
                : 'M26 6H10V18C10 22.6863 11 28 11 28C11 28 17.9746 19.5 18 19.5C18.4727 19.5 25 28 25 28C25 28 26 22.6863 26 18V6Z'
            }
            animate={{
              d: isBookmarked
                ? 'M26 6H10V18V30C10 30 17.9746 23.5 18 23.5C18.0254 23.5 26 30 26 30V18V6Z'
                : 'M26 6H10V18C10 22.6863 11 28 11 28C11 28 17.9746 19.5 18 19.5C18.4727 19.5 25 28 25 28C25 28 26 22.6863 26 18V6Z'
            }}
            transition={{ duration: 0.15 }}
          />
          <motion.path
            className="corner"
            d="M10 6C10 6 14.8758 6 18 6C21.1242 6 26 6 26 6C26 6 26 6 26 6H10C10 6 10 6 10 6Z"
          />
        </motion.svg>
      </motion.button>
    </div>
  );
}
