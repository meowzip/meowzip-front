import { useRef, useEffect, useState } from 'react';
import List from './List';
import ListItem from './ListItem';
import ListCenter from './ListCenter';

interface ScrollPickerProps {
  list: (string | number)[];
  onSelectedChange?: (selected: string | number) => void;
  initialSelected?: string | number;
}

const Picker = ({
  list,
  onSelectedChange,
  initialSelected
}: ScrollPickerProps) => {
  const SCROLL_DEBOUNCE_TIME = 100;
  const newList = ['', ...list, ''];
  const ref = useRef<HTMLUListElement>(null);
  const initialIndex =
    initialSelected !== undefined ? newList.indexOf(initialSelected) : 1;

  const [selected, setSelected] = useState(
    initialIndex !== -1 ? initialIndex : 1
  );
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const ITEM_HEIGHT = 48;
  const [isInitialized, setIsInitialized] = useState(false);

  const handleScroll = (e: React.UIEvent<HTMLUListElement>) => {
    e.stopPropagation();

    if (ref.current) {
      clearTimeout(timerRef.current!);

      if (ref.current.scrollTop < ITEM_HEIGHT) {
        ref.current.scrollTop = ITEM_HEIGHT;
      }

      timerRef.current = setTimeout(() => {
        const index = Math.floor(
          (ref.current!.scrollTop + ITEM_HEIGHT / 2) / ITEM_HEIGHT
        );

        if (newList[index] !== '') {
          setSelected(index);
          onSelectedChange && onSelectedChange(newList[index]);
        }
      }, SCROLL_DEBOUNCE_TIME);
    }
  };

  const forceAlignment = () => {
    if (!ref.current) return false;

    const targetIndex = initialIndex !== -1 ? initialIndex : 1;
    const targetScrollTop = targetIndex * ITEM_HEIGHT;

    ref.current.scrollTop = targetScrollTop;
    setSelected(targetIndex);

    return Math.abs(ref.current.scrollTop - targetScrollTop) < 5;
  };

  useEffect(() => {
    if (!isInitialized && ref.current) {
      const timer = setTimeout(() => {
        if (forceAlignment()) {
          setIsInitialized(true);
        }
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [initialIndex, isInitialized, ITEM_HEIGHT]);

  useEffect(() => {
    if (ref.current && isInitialized) {
      ref.current.scrollTop = selected * ITEM_HEIGHT;
    }
  }, [selected, isInitialized, ITEM_HEIGHT]);

  const handleTouchStart = (e: React.TouchEvent) => {
    e.stopPropagation();
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      style={{ touchAction: 'pan-y' }}
    >
      <List ref={ref} onScroll={handleScroll}>
        <ListCenter />
        {newList.map((item, index) => (
          <ListItem
            key={index}
            isSelected={index === selected}
            ref={el => {
              itemRefs.current[index] = el;
            }}
          >
            {item}
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Picker;
