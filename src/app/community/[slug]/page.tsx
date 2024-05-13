'use client';

import WriteComment from '@/components/community/detail/WriteComment';
import { useEffect, useState } from 'react';
import FeedCard from '@/components/community/FeedCard';
import Comment from '@/components/community/detail/Comment';
import MoreBtnBottomSheet from '@/components/community/MoreBtnBottomSheet';
import FeedWriteModal from '@/components/community/FeedWriteModal';
import { useQuery } from '@tanstack/react-query';
import { getFeedDetail } from '@/services/community';
import { getCookie } from '@/utils/common';
import { jwtDecode } from 'jwt-decode';

const DetailPage = ({ params: { slug } }: { params: { slug: number } }) => {
  const [editBottomSheet, setEditBottomSheet] = useState(false);
  const [showWriteModal, setShowWriteModal] = useState(false);

  const token = getCookie('Authorization');
  const decodedToken: { memberId: number } = jwtDecode(token);

  const { data: feedDetail } = useQuery({
    queryKey: ['feedDetail', slug],
    queryFn: () => getFeedDetail(slug),
    staleTime: 1000 * 60 * 10
  });

  useEffect(() => {
    if (!feedDetail) return;
  }, [slug]);

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
    <div className="pb-[100px]">
      <FeedCard
        variant="detail"
        content={feedDetail}
        openBottomSheet={() => setEditBottomSheet(true)}
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
      {showWriteModal && (
        <FeedWriteModal
          onClose={() => setShowWriteModal(false)}
          feedDetail={feedDetail}
        />
      )}
      <MoreBtnBottomSheet
        isVisible={editBottomSheet}
        setIsVisible={() => setEditBottomSheet(!editBottomSheet)}
        heightPercent={['50%', '40%']}
        isMine={decodedToken.memberId === feedDetail?.memberId}
        showWriteModal={setShowWriteModal}
      />
    </div>
  );
};

export default DetailPage;
