import DiaryCard from '@/components/diary/DiaryCard';
import Filter from '@/components/diary/Filter';
import ImageUploader from '@/components/diary/ImageUploader';
import DiaryListLayout from '@/components/diary/DiaryListLayout';

const mockup = [
  {
    pk: 1,
    images: [
      'https://www.petmd.com/sites/default/files/petmd-cat-happy-13.jpg',
      'https://i.ytimg.com/vi/YCaGYUIfdy4/maxresdefault.jpg',
      'https://i.pinimg.com/originals/81/6d/a5/816da533638aee63cfbd315ea24cccbd.jpg'
    ],
    labels: [
      {
        type: 'default' as const,
        content: '사료',
        icon: 'https://nemo-erp-dev.s3.ap-northeast-2.amazonaws.com/bus/image/home.svg'
      },
      {
        type: 'default' as const,
        content: '물',
        icon: 'https://nemo-erp-dev.s3.ap-northeast-2.amazonaws.com/bus/image/home.svg'
      }
    ],
    content:
      '오늘도 먼지는 귀엽다냥 🧡 내용이 길어도 세 줄까지만 보여짐 냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥',
    profiles: [
      {
        key: '1',
        src: 'https://github.com/shadcn.png',
        style: 'w-6 h-6 absolute border border-gr-white'
      },
      {
        key: '2',
        src: 'https://github.com/shadcn.png',
        style: 'w-6 h-6 absolute left-[20px] border border-gr-white'
      },
      {
        key: '3',
        src: 'https://github.com/shadcn.png',
        style: 'w-6 h-6 absolute left-[40px] border border-gr-white'
      }
    ]
  },
  {
    pk: 2,
    images: [],
    labels: [
      {
        type: 'default' as const,
        content: '사료',
        icon: 'https://nemo-erp-dev.s3.ap-northeast-2.amazonaws.com/bus/image/home.svg'
      },
      {
        type: 'default' as const,
        content: '물',
        icon: 'https://nemo-erp-dev.s3.ap-northeast-2.amazonaws.com/bus/image/home.svg'
      }
    ],
    content:
      '오늘도 먼지는 귀엽다냥 🧡 내용이 길어도 세 줄까지만 보여짐 냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥',
    profiles: [
      {
        key: '1',
        src: 'https://github.com/shadcn.png',
        style: 'w-6 h-6 absolute border border-gr-white'
      },
      {
        key: '2',
        src: 'https://github.com/shadcn.png',
        style: 'w-6 h-6 absolute left-[20px] border border-gr-white'
      },
      {
        key: '3',
        src: 'https://github.com/shadcn.png',
        style: 'w-6 h-6 absolute left-[40px] border border-gr-white'
      }
    ]
  }
];

const page = () => {
  return (
    <DiaryListLayout>
      <section className="flex justify-start gap-4 bg-gr-white">
        <Filter
          propObj={{
            key: '1',
            image: 'bg-gr-400',
            share: true,
            label: '전체보기'
          }}
        />
        <Filter
          propObj={{
            key: '1',
            image:
              'https://i.natgeofe.com/k/ad9b542e-c4a0-4d0b-9147-da17121b4c98/MOmeow1_square.png',
            share: true,
            label: '식빵이'
          }}
        />
        <Filter
          propObj={{
            key: '2',
            image:
              'https://i.natgeofe.com/k/ad9b542e-c4a0-4d0b-9147-da17121b4c98/MOmeow1_square.png',
            share: false,
            label: '꼬기'
          }}
        />
      </section>
      <section className="p-4">
        {mockup.map(item => (
          <DiaryCard
            key={item.pk}
            images={item.images}
            labels={item.labels}
            content={item.content}
            profiles={item.profiles}
          />
        ))}
      </section>
      {/* <section>
        <ImageUploader />
      </section> */}
    </DiaryListLayout>
  );
};

export default page;
