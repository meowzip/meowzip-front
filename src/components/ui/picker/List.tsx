import { forwardRef } from 'react';

interface ListProps {
  children: React.ReactNode;
  onScroll: () => void;
}
const List = forwardRef(
  ({ children, onScroll }: ListProps, ref: React.Ref<HTMLUListElement>) => (
    <ul
      ref={ref}
      onScroll={onScroll}
      className="scrollbar-none relative m-0 h-36 w-full list-none overflow-hidden overflow-y-scroll p-0 scrollbar-hide"
    >
      {children}
    </ul>
  )
);

List.displayName = 'List';

export default List;
