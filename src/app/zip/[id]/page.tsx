'use client';

import React, { useEffect, useState } from 'react';
import ZipDetailDiary from '../../../components/zip/ZipDetailDiary';
import Topbar from '@/components/ui/Topbar';
import { useRouter } from 'next/navigation';
import MoreBtnBottomSheet from '@/components/community/MoreBtnBottomSheet';
import DetailCardLayout from '@/components/zip/DetailCardLayout';
import { useCatDetail } from '@/hooks/useCats';
import { DiaryObj } from '@/app/diary/diaryType';
import ZipDetailCoParents from '@/components/zip/ZipDetailCoParents';
import { CoParent } from '@/app/zip/catType';
import ZipDetailCatCard from '../../../components/zip/ZipDetailCatCard';

const profiles = [
  { memberId: 1, imageUrl: 'https://github.com/shadcn.png', nickname: '민지' },
  { memberId: 2, imageUrl: 'https://github.com/shadcn.png', nickname: '해린' },
  { memberId: 3, imageUrl: 'https://github.com/shadcn.png', nickname: '소미' }
];

const diaries = [
  {
    id: 1,
    isGivenWater: true,
    isFeed: false,
    content: '오늘은 고양이들과 놀았어요 1111',
    images: ['https://github.com/shadcn.png', 'https://github.com/shadcn.png'],
    caredTime: '오후 06:00',
    memberId: 1,
    memberNickname: '뇽뇽이',
    taggedCats: [
      {
        id: 1,
        imageUrl: 'https://meowzip.com/cat1.jpg',
        name: '냥이',
        sex: 'F' as 'F' | 'M'
      }
    ]
  },
  {
    id: 2,
    isGivenWater: false,
    isFeed: true,
    content: '오늘은 고양이들과 놀았어요 22222',
    images: [],
    caredTime: '오후 03:00',
    memberId: 1,
    memberNickname: '삼색이',
    taggedCats: [
      {
        id: 1,
        imageUrl: 'https://meowzip.com/cat1.jpg',
        name: '냥이',
        sex: 'F' as 'F' | 'M'
      }
    ]
  },
  {
    id: 3,
    isGivenWater: true,
    isFeed: true,
    content:
      '오늘은 고양이들과 놀았어요 오늘은 고양이들과 놀았어요 오늘은 고양이들과 놀았어요 오늘은 고양이들과 놀았어요 오늘은 고양이들과 놀았어요 오늘은 고양이들과 놀았어요 오늘은 고양이들과 놀았어요 오늘은 고양이들과 놀았어요 오늘은 고양이들과 놀았어요 오늘은 고양이들과 놀았어요',
    images: ['https://github.com/shadcn.png', 'https://github.com/shadcn.png'],
    caredTime: '오후 11:00',
    memberId: 1,
    memberNickname: '치즈',
    taggedCats: [
      {
        id: 1,
        imageUrl: 'https://meowzip.com/cat1.jpg',
        name: '냥이',
        sex: 'M' as 'F' | 'M'
      }
    ]
  },
  {
    id: 4,
    isGivenWater: true,
    isFeed: true,
    content: '오늘은 고양이들과 놀았어요 4444',
    images: ['https://github.com/shadcn.png', 'https://github.com/shadcn.png'],
    caredTime: '오후 08:00',
    memberId: 1,
    memberNickname: '이브',
    taggedCats: [
      {
        id: 1,
        imageUrl: 'https://meowzip.com/cat1.jpg',
        name: '냥이',
        sex: 'F' as 'F' | 'M'
      }
    ]
  }
];

const catObj = {
  id: 1,
  imageUrl: 'https://meowzip.com/cat1.jpg',
  name: '냥이',
  isCoParented: true,
  dDay: 250,
  sex: 'F',
  isNeutered: 'Y'
};

const ZipDiaryPage = ({ params: { id } }: { params: { id: number } }) => {
  const router = useRouter();

  const [editBottomSheet, setEditBottomSheet] = useState(false);
  const [showCatEditModal, setShowCatEditModal] = useState(false);

  const { data: catDetail, isError, isLoading } = useCatDetail(id);

  useEffect(() => {
    if (!catDetail) return;
  }, [id]);

  if (isLoading) return <div>로딩중</div>;
  if (isError) return <div>에러</div>;

  return (
    <>
      <Topbar
        type="modal"
        onClose={() => router.push('/zip')}
        onClick={() => setEditBottomSheet(true)}
      />
      <section className="flex h-screen flex-col gap-4 overflow-auto bg-gr-50 px-4 pb-32 pt-[72px]">
        <article className="rounded-16">
          <ZipDetailCatCard {...catObj} />
        </article>
        <DetailCardLayout
          titleObj={{
            title: '공동집사',
            onClick: () => console.log('공동집사 바텀 시트 열기')
          }}
          btnObj={{
            text: '함께할 공동집사 찾기',
            onClick: () => console.log('공동 냥육 요청 모달 열기')
          }}
        >
          <div className="flex pt-2">
            {profiles.map((coParent: CoParent) => (
              <ZipDetailCoParents key={coParent.memberId} {...coParent} />
            ))}
            {/* {catDetail.coParents?.map((coParent: CoParent) => (
            <ZipDetailCoParents key={coParent.memberId} {...coParent} />
          ))} */}
          </div>
        </DetailCardLayout>
        <DetailCardLayout
          titleObj={{ title: '일지' }}
          btnObj={{
            text: '더보기',
            onClick: () =>
              console.log('이 고양이로 필터링 된 일지 목록 페이지 이동')
          }}
        >
          {diaries.slice(0, 3).map((diary: DiaryObj) => (
            <ZipDetailDiary key={diary.id} {...diary} />
          ))}
          {/* {catDetail.diaries?.slice(0, 3).map((diary: DiaryObj) => (
            <ZipDetailDiary key={diary.id} {...diary} />
          ))} */}
        </DetailCardLayout>
      </section>

      <MoreBtnBottomSheet
        isVisible={editBottomSheet}
        setIsVisible={() => setEditBottomSheet(!editBottomSheet)}
        heightPercent={['50%', '40%']}
        name={'name'}
        isMine={true}
        // onDelete={deleteDidary}
        onEdit={() => setShowCatEditModal(true)}
      />
    </>
  );
};

export default ZipDiaryPage;
