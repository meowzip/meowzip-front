import Image from 'next/image';
import BackIcon from '../../../public/images/icons/back.svg';
import { Input } from '@/components/ui/Input';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

interface BaseProps {
  type: 'home' | 'page' | 'modal' | 'search' | 'bottom' | 'save';
  title?: string;
  hideLeft?: boolean;
  hideRight?: boolean;
  onClose?: () => void;
  onClick?: () => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Topbar = ({
  type,
  title,
  hideLeft,
  hideRight,
  onClose,
  onClick,
  onChange
}: BaseProps) => {
  const CONTENT_LIST = [
    {
      type: 'home',
      content: {
        left: (
          <div className="px-[10px] py-1">
            <Image
              src="/next.svg"
              alt="calendar"
              width={24}
              height={24}
              className="h-6 w-6"
            />
          </div>
        ),
        center: <p>오늘</p>,
        right: (
          <div className="px-[10px] py-1">
            <Image
              src="/images/icons/calendar.svg"
              alt="calendar"
              width={24}
              height={24}
              className="h-6 w-6 cursor-pointer"
              onClick={onClick}
            />
          </div>
        )
      }
    },
    {
      type: 'page',
      content: {
        left: <p>{title}</p>,
        center: '',
        right: (
          <div className="flex">
            <div className="px-[10px] py-1">
              <Image
                src="/images/icons/alert.svg"
                alt="calendar"
                width={24}
                height={24}
                className="h-6 w-6"
              />
            </div>
            <div className="px-[10px] py-1">
              <Image
                src="/images/icons/setting.svg"
                alt="calendar"
                width={24}
                height={24}
                className="h-6 w-6"
              />
            </div>
          </div>
        )
      }
    },
    {
      type: 'modal',
      content: {
        left: (
          <div className="flex px-[10px] py-1" onClick={onClose}>
            <BackIcon
              width={24}
              height={24}
              stroke="var(--gr-black)"
              className="cursor-pointer"
              onClick={onClick}
            />
          </div>
        ),
        center: <p onClick={onClick}>{title}</p>,
        right: (
          <div className="px-[10px] py-1">
            <Image
              src="/images/icons/menu.svg"
              alt="calendar"
              width={24}
              height={24}
              className="h-6 w-6"
            />
          </div>
        )
      }
    },
    {
      type: 'search',
      content: {
        left: (
          <div className="px-[10px] py-1">
            <BackIcon
              width={24}
              height={24}
              stroke="var(--gr-black)"
              className="cursor-pointer"
              onClick={onClose}
            />
          </div>
        ),
        center: (
          <Input
            variant="search"
            placeholder="고양이 검색..."
            onChange={onChange}
            // iconEnd={
            //   <Image
            //     src="/images/icons/close-btn.svg"
            //     alt="close-btn"
            //     width={24}
            //     height={24}
            //     className="h-6 w-6"
            //   />
            // }
          />
        )
        // right: (
        //   <div className="px-[10px] py-1">
        //     <Image
        //       src="/images/icons/close-btn.svg"
        //       alt="close-btn"
        //       width={24}
        //       height={24}
        //       className="h-6 w-6"
        //     />
        //   </div>
        // )
      }
    },
    {
      type: 'bottom',
      content: {
        left: '',
        center: <p>{title}</p>,
        right: ''
      }
    },
    {
      type: 'save',
      content: {
        left: (
          <div className="flex px-[10px] py-1" onClick={onClose}>
            <BackIcon
              width={24}
              height={24}
              stroke="var(--gr-black)"
              className="cursor-pointer"
              onClick={onClose}
            />
          </div>
        ),
        center: <p onClick={onClick}>{title}</p>,
        right: (
          <Button
            variant="text"
            size="md"
            className="text-pr-500"
            onClick={onClick}
          >
            완료
          </Button>
        )
      }
    }
  ];

  const currentItem = CONTENT_LIST.find(item => item.type === type);
  const emptyElement = <div className="px-[10px] py-1"></div>;

  const topbarClassName = cn(
    'relative z-10 flex h-12 w-full items-center bg-grey-white px-[6px]',
    {
      'z-[60]': type === 'modal',
      'justify-normal border-b-2': type === 'search',
      'justify-between': type !== 'search'
    }
  );

  return (
    <div className={topbarClassName}>
      {hideLeft ? emptyElement : <section>{currentItem?.content.left}</section>}
      <section>{currentItem?.content.center}</section>
      {hideRight ? (
        emptyElement
      ) : (
        <section>{currentItem?.content.right}</section>
      )}
    </div>
  );
};

export default Topbar;
