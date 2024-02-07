'use client';

import React, { useState } from 'react';
import FeedCard from '../../components/community/FeedCard';
import FloatingActionButton from '@/components/ui/FloatingActionButton';
import FeedWriteModal from '@/components/community/FeedWriteModal';
import BottomSheet from '@/components/ui/BottomSheet';
import ActionButton from '@/components/ui/ActionButton';

const CommunityPage = () => {
  const [showWriteModal, setShowWriteModal] = useState(false);
  const [editBottomSheet, setEditBottomSheet] = useState(false);
  const [isMyFeed, setIsMyFeed] = useState(true);
  const [feedList, setFeedList] = useState([
    {
      id: 1,
      profile: 'https://github.com/shadcn.png',
      nickname: '친절한캔따개',
      time: '5분 전',
      text: '울 애기 내 침대에서 잘도 잔다 🧡 엔터 포함 내용이 길어지면 3줄까지 보여짐 이렇게 저렇게 블라블라 울라블라 짱구는 못말려 맹구 훈이 유리 토끼인형 이렇게 저렇게 블라블라 울라블라 짱구는 못말려 맹구 훈이 유리 토끼인형',
      images: [
        'https://www.petmd.com/sites/default/files/petmd-cat-happy-13.jpg',
        'https://i.ytimg.com/vi/YCaGYUIfdy4/maxresdefault.jpg',
        'https://i.pinimg.com/originals/81/6d/a5/816da533638aee63cfbd315ea24cccbd.jpg'
      ],
      like: 345,
      comment: 192
    },
    {
      id: 2,
      profile: 'https://github.com/shadcn.png',
      nickname: '발랄한캔따개',
      time: '20분 전',
      text: '울 애기 내 침대에서 잘도 잔다 🧡 엔터 포함 내용이 길어지면 3줄까지 보여짐 이렇게 저렇게 블라블라 울라블라 짱구는 못말려 맹구 훈이 유리 토끼인형 이렇게 저렇게 블라블라 울라블라 짱구는 못말려 맹구 훈이 유리 토끼인형',
      images: [
        'https://www.petmd.com/sites/default/files/petmd-cat-happy-13.jpg',
        'https://i.ytimg.com/vi/YCaGYUIfdy4/maxresdefault.jpg',
        'https://i.pinimg.com/originals/81/6d/a5/816da533638aee63cfbd315ea24cccbd.jpg'
      ],
      like: 220,
      comment: 95
    }
  ]);

  return (
    <>
      <h1 className="flex h-12 items-center pl-4 align-middle text-heading-3 text-gr-900">
        커뮤니티
      </h1>
      {feedList.map(feed => (
        <FeedCard
          key={feed.id}
          content={feed}
          onClick={() => setEditBottomSheet(true)}
        />
      ))}
      <FloatingActionButton onClick={() => setShowWriteModal(true)} />

      {showWriteModal && (
        <FeedWriteModal onClose={() => setShowWriteModal(false)} />
      )}

      <BottomSheet
        isVisible={editBottomSheet}
        setIsVisible={() => setEditBottomSheet(!editBottomSheet)}
        topBar={true}
      >
        {isMyFeed ? (
          <>
            <ActionButton
              icon="/images/icons/edit.svg"
              content="수정하기"
              onClick={() => console.log('open modal:EDIT')}
            />
            <ActionButton
              icon="/images/icons/delete.svg"
              content="삭제하기"
              onClick={() => console.log('open modal:DELETE')}
            />
          </>
        ) : (
          <>
            <ActionButton
              icon="/images/icons/edit.svg"
              content="게시물 신고하기"
              onClick={() => console.log('open modal:REPORT')}
            />
            <ActionButton
              icon="/images/icons/delete.svg"
              content="작성자 차단하기"
              onClick={() => console.log('open modal:BLOCK')}
            />
          </>
        )}
      </BottomSheet>
    </>
  );
};

export default CommunityPage;
