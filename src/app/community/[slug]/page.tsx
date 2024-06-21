'use client';

import WriteComment from '@/components/community/detail/WriteComment';
import { useEffect, useState } from 'react';
import FeedCard from '@/components/community/FeedCard';
import Comment from '@/components/community/detail/Comment';
import MoreBtnBottomSheet from '@/components/community/MoreBtnBottomSheet';
import FeedWriteModal from '@/components/community/FeedWriteModal';
import { useQuery } from '@tanstack/react-query';
import { getFeedDetail } from '@/services/community';
import Topbar from '@/components/ui/Topbar';
import { useRouter } from 'next/navigation';
import { getFeedComments } from '@/services/community';
import { CommentType } from '@/types/communityType';
import useFeedMutations from '@/hooks/community/useFeedMutations';
import useCommentMutation from '@/hooks/community/useCommentMutation';

const DetailPage = ({ params: { slug } }: { params: { slug: number } }) => {
  const router = useRouter();

  const [editBottomSheet, setEditBottomSheet] = useState(false);
  const [showWriteModal, setShowWriteModal] = useState(false);
  const [selectedComment, setSelectedComment] = useState<CommentType>();

  const { data: feedDetail } = useQuery({
    queryKey: ['feedDetail', slug],
    queryFn: () => getFeedDetail(slug),
    staleTime: 1000 * 60 * 10
  });

  const { data: commentsData } = useQuery({
    queryKey: ['comments', slug],
    queryFn: () => getFeedComments(slug),
    staleTime: 1000 * 60 * 10
  });

  const {
    deleteFeed,
    blockFeed,
    reportFeed,
    likeFeed,
    unLikeFeed,
    bookmarkFeed,
    cancelBookmarkFeed
  } = useFeedMutations();

  const { blockComment, reportComment } = useCommentMutation();

  const comments = commentsData?.items || [];

  useEffect(() => {
    if (!feedDetail) return;
  }, [slug]);

  return (
    <>
      <Topbar type="three">
        <Topbar.Back onClick={() => router.back()} />
        <Topbar.Title title="피드" />
        <Topbar.Empty />
      </Topbar>
      <div className="pb-[100px] pt-12">
        <FeedCard
          variant="detail"
          content={feedDetail}
          openBottomSheet={() => {
            setEditBottomSheet(true);
          }}
          likeFeed={() => likeFeed(feedDetail)}
          unLikeFeed={() => unLikeFeed(feedDetail)}
          bookmarkFeed={() => bookmarkFeed(feedDetail)}
          cancelBookmarkFeed={() => cancelBookmarkFeed(feedDetail)}
        />
        {comments.length === 0 && (
          <p className="py-8 text-center text-sm text-gr-300">
            아직 댓글이 없어요
            <br />
            가장 먼저 댓글을 남겨보세요.
          </p>
        )}

        {comments.map((comment: CommentType, index: number) => (
          <div key={index} className="py-4">
            <Comment
              comment={comment}
              setEditBottomSheet={setEditBottomSheet}
              setSelectedComment={
                setSelectedComment as React.Dispatch<
                  React.SetStateAction<CommentType>
                >
              }
            />
          </div>
        ))}
        <WriteComment feedId={feedDetail?.id} />
        {showWriteModal && (
          <FeedWriteModal
            onClose={() => setShowWriteModal(false)}
            feedDetail={feedDetail}
          />
        )}
        <MoreBtnBottomSheet
          type={selectedComment ? 'comment' : 'feed'}
          isVisible={editBottomSheet}
          setIsVisible={() => {
            setEditBottomSheet(!editBottomSheet);
          }}
          heightPercent={['50%', '40%']}
          name={feedDetail?.memberNickname}
          memberId={
            selectedComment ? selectedComment?.memberId : feedDetail?.memberId
          }
          onDelete={() => {
            if (!selectedComment) {
              deleteFeed(feedDetail);
            }
          }}
          onEdit={() => {
            if (!selectedComment) {
              setShowWriteModal(true);
            }
          }}
          onBlock={() => {
            selectedComment
              ? blockComment(feedDetail?.id)
              : blockFeed(feedDetail);
          }}
          onReport={() => {
            selectedComment
              ? reportComment(feedDetail?.id, selectedComment?.id)
              : reportFeed(feedDetail);
          }}
          showWriteModal={selectedComment ? undefined : setShowWriteModal}
        />
      </div>
    </>
  );
};

export default DetailPage;
