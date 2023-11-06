import DiaryCard from '@/components/diary/DiaryCard';
import Filter from '@/components/diary/Filter';

const page = () => {
  return (
    <>
      <section className="flex justify-start gap-3">
        <Filter
          propObj={{
            key: '1',
            image:
              'https://i.natgeofe.com/k/ad9b542e-c4a0-4d0b-9147-da17121b4c98/MOmeow1_square.png',
            share: true
          }}
        />
        <Filter
          propObj={{
            key: '2',
            image:
              'https://i.natgeofe.com/k/ad9b542e-c4a0-4d0b-9147-da17121b4c98/MOmeow1_square.png',
            share: false
          }}
        />
      </section>
      <section className="p-4">
        <DiaryCard
          images={[
            'https://www.petmd.com/sites/default/files/petmd-cat-happy-13.jpg',
            'https://i.ytimg.com/vi/YCaGYUIfdy4/maxresdefault.jpg',
            'https://i.pinimg.com/originals/81/6d/a5/816da533638aee63cfbd315ea24cccbd.jpg'
          ]}
          labels={[
            {
              type: 'default',
              content: '사료',
              icon: 'https://nemo-erp-dev.s3.ap-northeast-2.amazonaws.com/bus/image/home.svg'
            },
            {
              type: 'default',
              content: '물',
              icon: 'https://nemo-erp-dev.s3.ap-northeast-2.amazonaws.com/bus/image/home.svg'
            }
          ]}
          content="오늘도 먼지는 귀엽다냥 🧡 내용이 길어도 세 줄까지만 보여짐 냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥"
          profiles={[
            {
              key: '1',
              src: 'https://github.com/shadcn.png',
              style: 'w-10 h-10 absolute'
            },
            {
              key: '2',
              src: 'https://github.com/shadcn.png',
              style: 'w-10 h-10 absolute left-[30px]'
            },
            {
              key: '3',
              src: 'https://github.com/shadcn.png',
              style: 'w-10 h-10 absolute left-[60px]'
            }
          ]}
        />
      </section>
    </>
  );
};

export default page;
