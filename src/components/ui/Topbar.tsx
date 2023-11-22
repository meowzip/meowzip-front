import Image from 'next/image';
import BackIcon from '../../../public/images/icons/back.svg';

interface BaseProps {
  type: 'home' | 'page' | 'modal' | 'search' | 'bottom';
  title?: string;
  onClose?: () => void;
}

const Topbar = ({ type, title, onClose }: BaseProps) => {
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
              className="h-6 w-6"
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
            <BackIcon width={24} height={24} stroke="var(--gr-black)" />
          </div>
        ),
        center: <p>{title}</p>,
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
            <Image
              src="/next.svg"
              alt="calendar"
              width={20}
              height={20}
              className="h-5 w-5"
            />
          </div>
        ),
        center: <p>search input</p>,
        right: (
          <div className="px-[10px] py-1">
            <Image
              src="/images/icons/search.svg"
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
      type: 'bottom',
      content: {
        left: '',
        center: <p>{title}</p>,
        right: ''
      }
    }
  ];

  const currentItem = CONTENT_LIST.find(item => item.type === type);

  return (
    <div className="flex h-12 w-full items-center justify-between bg-gr-white px-[6px]">
      <section>{currentItem?.content.left}</section>
      <section>{currentItem?.content.center}</section>
      <section>{currentItem?.content.right}</section>
    </div>
  );
};

export default Topbar;
