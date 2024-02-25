'use client';

import React, { useState } from 'react';
import FeedCard from '../../components/community/FeedCard';
import FloatingActionButton from '@/components/ui/FloatingActionButton';
import FeedWriteModal from '@/components/community/FeedWriteModal';
import BottomSheet from '@/components/ui/BottomSheet';
import ActionButton from '@/components/ui/ActionButton';
import Modal from '@/components/ui/Modal';

const CommunityPage = () => {
  const [editBottomSheet, setEditBottomSheet] = useState(false);
  const [showWriteModal, setShowWriteModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState<{
    title: string;
    body?: string;
    primaryBtn: { content: string; onClick: () => void };
  }>();
  const [name, setName] = useState('이치즈');
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

  const openModalEdit = () => {
    setEditBottomSheet(false);
    setShowWriteModal(true);
  };
  const openModalDelete = () => {
    setShowModal(true);
    setEditBottomSheet(false);
    setModalContent({
      title: '삭제하시겠습니까?',
      primaryBtn: { content: '삭제', onClick: () => deleteFeed() }
    });
  };
  const openModalReport = () => {
    setEditBottomSheet(false);
    setShowModal(true);
    setModalContent({
      title: '해당 게시글을 \n 신고하시겠습니까?',
      primaryBtn: { content: '신고하기', onClick: () => reportFeed() }
    });
  };
  const openModalBlock = () => {
    setEditBottomSheet(false);
    setShowModal(true);
    setModalContent({
      title: `${name}님을 \n 차단하시겠습니까?`,
      body: '차단된 사용자의 게시글과 댓글을 회원님께 \n 더이상 표시하지 않습니다.',
      primaryBtn: { content: '차단하기', onClick: () => blockFeed() }
    });
  };

  const deleteFeed = () => {
    console.log('삭제 버튼 클릭');
    setShowModal(false);
  };
  const reportFeed = () => {
    console.log('신고 버튼 클릭');
    setShowModal(false);
  };
  const blockFeed = () => {
    console.log('차단 버튼 클릭');
    setShowModal(false);
  };

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
        heightPercent={['40%', '40%']}
      >
        <div className="px-4">
          {isMyFeed ? (
            <>
              <ActionButton
                icon="/images/icons/edit.svg"
                content="수정하기"
                onClick={() => openModalEdit()}
              />
              <ActionButton
                icon="/images/icons/delete.svg"
                content="삭제하기"
                onClick={() => openModalDelete()}
              />
            </>
          ) : (
            <>
              <ActionButton
                icon="/images/icons/edit.svg"
                content="게시물 신고하기"
                onClick={() => openModalReport()}
              />
              <ActionButton
                icon="/images/icons/delete.svg"
                content="작성자 차단하기"
                onClick={() => openModalBlock()}
              />
            </>
          )}
        </div>
      </BottomSheet>

      {showModal && (
        <Modal
          contents={{ title: modalContent?.title, body: modalContent?.body }}
          scrim={true}
          buttons={[
            {
              variant: 'primary',
              size: 'lg',
              content: modalContent?.primaryBtn.content || '',
              style: 'w-full rounded-[16px] px-4 py-2 bg-sm-error-700',
              onClick: modalContent?.primaryBtn.onClick
            },
            {
              variant: 'text',
              size: 'lg',
              content: '나중에 할게요',
              style: 'w-full rounded-[16px] px-4 py-2 text-gr-300',
              onClick: () => setShowModal(false)
            }
          ]}
        />
      )}
    </>
  );
};

export default CommunityPage;
