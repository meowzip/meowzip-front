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
    initialSelected !== undefined ? newList.indexOf(initialSelected) : -1;
  const [selected, setSelected] = useState(
    initialIndex !== -1 ? initialIndex : 1
  );
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const ITEM_HEIGHT = 50;

  const handleScroll = () => {
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

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = selected * ITEM_HEIGHT;
    }
  }, [selected]);

  useEffect(() => {
    if (ref.current && initialIndex !== -1) {
      ref.current.scrollTop = initialIndex * ITEM_HEIGHT;
    }
  }, [initialIndex]);

  return (
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
  );
};

export default Picker;
