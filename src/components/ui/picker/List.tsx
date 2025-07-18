import { forwardRef, useEffect } from 'react';

interface ListProps {
  children: React.ReactNode;
  onScroll: (e: React.UIEvent<HTMLUListElement>) => void;
}
const List = forwardRef(
  ({ children, onScroll }: ListProps, ref: React.Ref<HTMLUListElement>) => {
    useEffect(() => {
      const handleTouchMove = (e: TouchEvent) => {
        e.stopPropagation();
      };

      const handleTouchStart = (e: TouchEvent) => {
        e.stopPropagation();
      };

      const currentRef = (ref as React.RefObject<HTMLUListElement>)?.current;

      if (currentRef) {
        currentRef.addEventListener('touchmove', handleTouchMove, {
          passive: true
        });
        currentRef.addEventListener('touchstart', handleTouchStart, {
          passive: true
        });

        return () => {
          currentRef.removeEventListener('touchmove', handleTouchMove);
          currentRef.removeEventListener('touchstart', handleTouchStart);
        };
      }
    }, [ref]);

    return (
      <ul
        ref={ref}
        onScroll={onScroll}
        className="scrollbar-none relative m-0 h-36 w-full list-none overflow-hidden overflow-y-scroll p-0 scrollbar-hide"
        style={{
          touchAction: 'pan-y',
          WebkitOverflowScrolling: 'touch'
        }}
        onTouchMove={e => e.stopPropagation()}
        onTouchStart={e => e.stopPropagation()}
      >
        {children}
      </ul>
    );
  }
);

List.displayName = 'List';

export default List;
