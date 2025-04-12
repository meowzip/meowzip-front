import React from 'react';
import styles from './Bookmark.module.css';

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
    if (
      typeof window !== 'undefined' &&
      window.ReactNativeWebView &&
      window.vibrate
    ) {
      window.vibrate(30);
    }
  };

  return (
    <button
      className={`${styles.bookmarkButton} ${isBookmarked ? styles.bookmarked : ''}`}
      onClick={handleClick}
      aria-label="북마크"
    >
      <svg viewBox="0 0 24 24" className={styles.bookmarkIcon}>
        <path
          className={styles.bookmarkOutline}
          d="M9 4H15C17.2091 4 19 5.79086 19 8V19.1683C19 20.4672 17.4883 21.1657 16.5 20.2L13.5 17.2C12.6716 16.3716 11.3284 16.3716 10.5 17.2L7.5 20.2C6.51167 21.1657 5 20.4672 5 19.1683V8C5 5.79086 6.79086 4 9 4Z"
        />
        <path
          className={styles.bookmarkFill}
          d="M9 4H15C17.2091 4 19 5.79086 19 8V19.1683C19 20.4672 17.4883 21.1657 16.5 20.2L13.5 17.2C12.6716 16.3716 11.3284 16.3716 10.5 17.2L7.5 20.2C6.51167 21.1657 5 20.4672 5 19.1683V8C5 5.79086 6.79086 4 9 4Z"
        />
      </svg>
    </button>
  );
}
