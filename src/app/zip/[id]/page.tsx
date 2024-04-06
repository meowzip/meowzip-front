'use client';

import React, { useState } from 'react';
import ZipDiary from '../../../components/zip/ZipDiary';
import Topbar from '@/components/ui/Topbar';
import { useRouter } from 'next/navigation';
import MoreBtnBottomSheet from '@/components/community/MoreBtnBottomSheet';
import { getCookie } from '@/utils/common';
import { jwtDecode } from 'jwt-decode';
import DetailCardLayout from '@/components/zip/DetailCardLayout';

const ZipDiaryPage = ({ params: { id } }: { params: { id: number } }) => {
  const router = useRouter();

  const [editBottomSheet, setEditBottomSheet] = useState(false);
  const [showCatEditModal, setShowCatEditModal] = useState(false);

  const token = getCookie('Authorization');
  const decodedToken: { memberId: number } = jwtDecode(token);

  return (
    <>
      <Topbar
        type="modal"
        onClose={() => router.push('/zip')}
        onClick={() => setEditBottomSheet(true)}
      />
      <section className="flex h-screen flex-col gap-4 bg-gr-50 px-4 pt-6">
        <article className="rounded-16 bg-gr-white">고양이 카드</article>
        <DetailCardLayout
          titleObj={{ title: '공동집사', onClick: () => {} }}
          btnObj={{ text: '함께할 공동집사 찾기', onClick: () => {} }}
        >
          공동 집사 목록 컴포넌트
        </DetailCardLayout>
        <DetailCardLayout
          titleObj={{ title: '일지', onClick: () => {} }}
          btnObj={{ text: '더보기', onClick: () => {} }}
        >
          일지 목록 3개
          {/* <ZipDiary /> */}
        </DetailCardLayout>
      </section>

      <MoreBtnBottomSheet
        isVisible={editBottomSheet}
        setIsVisible={() => setEditBottomSheet(!editBottomSheet)}
        heightPercent={['50%', '40%']}
        name={'name'}
        // isMine={decodedToken.memberId === diaryDetail.memberId}
        isMine={true}
        // onDelete={deleteDidary}
        onEdit={() => setShowCatEditModal(true)}
      />
    </>
  );
};

export default ZipDiaryPage;
