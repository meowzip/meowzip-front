import { forwardRef } from 'react';

interface ListItemProps {
  children: React.ReactNode;
  isSelected: boolean;
}
const ListItem = forwardRef(
  ({ children, isSelected }: ListItemProps, ref: React.Ref<HTMLLIElement>) => (
    <li
      ref={ref}
      className={`flex h-12 items-center justify-center ${isSelected ? 'flex h-10 items-center justify-center self-stretch rounded-lg bg-gr-50 font-semibold opacity-100' : 'opacity-40'}`}
    >
      {children}
    </li>
  )
);

ListItem.displayName = 'ListItem';

export default ListItem;
