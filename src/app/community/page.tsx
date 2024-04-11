'use client';

import React, { useState } from 'react';
import FeedCard from '../../components/community/FeedCard';
import FloatingActionButton from '@/components/ui/FloatingActionButton';
import FeedWriteModal from '@/components/community/FeedWriteModal';
import MoreBtnBottomSheet from '@/components/community/MoreBtnBottomSheet';
import { useAtom } from 'jotai';
import { showWriteModalAtom } from '@/atoms/modalAtom';

const CommunityPage = () => {
  const [editBottomSheet, setEditBottomSheet] = useState(false);
  const [showWriteModal, setShowWriteModal] = useAtom(showWriteModalAtom);
  const [name, setName] = useState('이치즈');
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
      <h1 className="fixed z-[999] flex h-12 w-full items-center bg-gr-white pl-4 align-middle text-heading-3 text-gr-900">
        커뮤니티
      </h1>
      <div className="pb-32 pt-12">
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
        <MoreBtnBottomSheet
          isVisible={editBottomSheet}
          setIsVisible={() => setEditBottomSheet(!editBottomSheet)}
          heightPercent={['50%', '40%']}
          name={name}
          isMine={true}
        />
      </div>
    </>
  );
};

export default CommunityPage;
