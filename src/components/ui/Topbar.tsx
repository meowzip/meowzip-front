import Image from 'next/image';

interface BaseProps {
  type: 'home' | 'page' | 'modal' | 'search' | 'bottom';
}

const Topbar = ({ type }: BaseProps) => {
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
              className="w-6 h-6"
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
              className="w-6 h-6"
            />
          </div>
        )
      }
    },
    {
      type: 'page',
      content: {
        left: <p>title</p>,
        center: '',
        right: (
          <div className="flex">
            <div className="px-[10px] py-1">
              <Image
                src="/images/icons/alert.svg"
                alt="calendar"
                width={24}
                height={24}
                className="w-6 h-6"
              />
            </div>
            <div className="px-[10px] py-1">
              <Image
                src="/images/icons/setting.svg"
                alt="calendar"
                width={24}
                height={24}
                className="w-6 h-6"
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
          <div className="flex px-[10px] py-1">
            <Image
              src="/next.svg"
              alt="calendar"
              width={24}
              height={24}
              className="w-6 h-6"
            />
          </div>
        ),
        center: <p>title</p>,
        right: (
          <div className="px-[10px] py-1">
            <Image
              src="/images/icons/menu.svg"
              alt="calendar"
              width={24}
              height={24}
              className="w-6 h-6"
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
              className="w-5 h-5"
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
              className="w-6 h-6"
            />
          </div>
        )
      }
    },
    {
      type: 'bottom',
      content: {
        left: '',
        center: <p>title</p>,
        right: ''
      }
    }
  ];

  const currentItem = CONTENT_LIST.find(item => item.type === type);

  return (
    <div className="flex justify-between items-center w-full px-[6px] bg-gr-100 h-12">
      <section>{currentItem?.content.left}</section>
      <section>{currentItem?.content.center}</section>
      <section>{currentItem?.content.right}</section>
    </div>
  );
};

export default Topbar;
