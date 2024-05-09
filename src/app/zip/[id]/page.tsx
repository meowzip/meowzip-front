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
import CoParentsBottomSheet from '@/components/zip/CoParentsBottomSheet';
import FindCoParentsModal from '../../../components/zip/FindCoParentsModal';
import { Toaster } from '@/components/ui/Toaster';
import Link from 'next/link';

const coParents = [
  {
    memberId: 1,
    imageUrl: 'https://github.com/shadcn.png',
    nickname: '민지',
    isRequested: true
  },
  {
    memberId: 2,
    imageUrl: 'https://github.com/shadcn.png',
    nickname: '해린',
    isRequested: true
  },
  {
    memberId: 3,
    imageUrl: 'https://github.com/shadcn.png',
    nickname: '소미',
    isRequested: true
  }
];

const ZipDiaryPage = ({ params: { id } }: { params: { id: number } }) => {
  const router = useRouter();

  const [editBottomSheet, setEditBottomSheet] = useState(false);
  const [coParentsBottomSheet, setCoParentsBottomSheet] = useState(false);
  const [showCatEditModal, setShowCatEditModal] = useState(false);
  const [showCoParentsModal, setShowCoParentsModal] = useState(false);

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
          <ZipDetailCatCard {...catDetail} />
        </article>
        <DetailCardLayout
          titleObj={{
            title: '공동집사',
            onClick: () => setCoParentsBottomSheet(true)
          }}
          btnObj={{
            text: '함께할 공동집사 찾기',
            onClick: () => setShowCoParentsModal(true)
          }}
        >
          <div className="flex pt-2">
            {coParents.map((coParent: CoParent) => (
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
            onClick: () => router.push(`/diary`)
          }}
        >
          {catDetail.diaries?.slice(0, 3).map((diary: DiaryObj) => (
            <Link href={`/diary/${diary.id}`} key={diary.id}>
              <ZipDetailDiary {...diary} />
            </Link>
          ))}
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
      <CoParentsBottomSheet
        isVisible={coParentsBottomSheet}
        setIsVisible={() => setCoParentsBottomSheet(!coParentsBottomSheet)}
        coParents={coParents}
      />

      {showCoParentsModal && (
        <FindCoParentsModal
          setShowCoParentsModal={setShowCoParentsModal}
          catId={catDetail.id}
        />
      )}
      <Toaster />
    </>
  );
};

export default ZipDiaryPage;
