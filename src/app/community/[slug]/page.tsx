'use client';
import WriteComment from '@/components/community/detail/WriteComment';
import { useState } from 'react';
import FeedCard from '@/components/community/FeedCard';
import BottomSheet from '@/components/ui/BottomSheet';
import ActionButton from '@/components/ui/ActionButton';
import { Fragment } from 'react';
import Comment from '@/components/community/detail/Comment';

type PageParams = {
  slug: string;
};

export default function DetailPage({ params }: { params: PageParams }) {
  const [editBottomSheet, setEditBottomSheet] = useState(false);
  const [isMyFeed, setIsMyFeed] = useState(true);

  const feed = {
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
  };

  const comments = [
    {
      type: 'comment',
      commentId: 1,
      writerId: 'NAME',
      writerNickname: 'NAME',
      content:
        '치즈냥이 너무 귀엽네용 골골대니 순하디순한냥인가봐요. 우리집 애기랑 똑같이 생겼어요~ 맞팔하고 자주 소통해요 😄',
      writerProfile: '',
      registerTime: '5분 전'
    },
    {
      type: 'reply',
      commentId: 2,
      writerId: 'NAME2',
      writerNickname: '발랄한캔따개',
      content: '그쵸. 완전 순해요~ 맞팔했습니당 🙌🏻',
      writerProfile: '',
      registerTime: '5분 전'
    },
    {
      type: 'comment',
      commentId: 3,
      writerId: 'NAME3',
      writerNickname: '발랄한캔따개',
      content: '저희 아이도 치즈냥이에요~ 애교 진짜 많죠!?',
      writerProfile: '',
      registerTime: '5분 전'
    }
  ];

  return (
    <div>
      {/* <p>feed Id: {params.slug}</p> */}
      <Fragment>
        <FeedCard
          variant="detail"
          content={feed}
          onClick={() => setEditBottomSheet(true)}
        />

        {comments.length === 0 && (
          <p className="py-8 text-center text-sm text-gr-300">
            아직 댓글이 없어요
            <br />
            가장 먼저 댓글을 남겨보세요.
          </p>
        )}

        {comments.map((comment, index) => (
          <div key={index} className="py-4">
            <Comment comment={comment} />
          </div>
        ))}
        <WriteComment />
      </Fragment>
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
    </div>
  );
}
