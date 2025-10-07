'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import WriteComment from './WriteComment';
import MoreBtnBottomSheet from '../MoreBtnBottomSheet';
import Topbar from '@/components/ui/Topbar';
import useFeedMutations from '@/hooks/community/useFeedMutations';
import useCommentMutation from '@/hooks/community/useCommentMutation';
import { FeedType, CommentType } from '@/types/communityType';
import FeedDetailContent from './FeedDetailContent';
import CommentList from './CommentList';
import { getFeedDetail, getFeedComments } from '@/services/community';

interface CommunityDetailClientProps {
  feedDetail: FeedType;
  comments: CommentType[];
  slug: number;
}

const CommunityDetailClient = ({
  feedDetail: initialFeedDetail,
  comments: initialComments,
  slug
}: CommunityDetailClientProps) => {
  const router = useRouter();
  const bottomSheetRef = useRef<HTMLDivElement>(null);
  const [, setBottomSheetHeight] = useState<number>(0);

  const { data: initialFeed } = useQuery({
    queryKey: ['feedDetail', slug],
    queryFn: () => getFeedDetail(slug),
    initialData: initialFeedDetail,
    staleTime: 5 * 60 * 1000
  });

  const { data: commentsData } = useQuery({
    queryKey: ['comments', slug],
    queryFn: async () => {
      const data = await getFeedComments(slug);
      return (data as any)?.items || [];
    },
    initialData: initialComments,
    staleTime: 5 * 60 * 1000
  });

  const [editBottomSheet, setEditBottomSheet] = useState(false);
  const [selectedComment, setSelectedComment] = useState<CommentType>();
  const [parentCommentId, setParentCommentId] = useState<number | null>(null);
  const [isReplying, setIsReplying] = useState(false);

  const { deleteFeed, blockFeed, reportFeed, toggleLikeFeed, toggleBookmark } =
    useFeedMutations(['feeds', 'feedDetail']);

  const { blockComment, reportComment, deleteComment } = useCommentMutation();

  useEffect(() => {
    if (bottomSheetRef.current) {
      const height = bottomSheetRef.current.scrollHeight;
      setBottomSheetHeight(height);
    }
  }, [editBottomSheet]);

  const handleReply = useCallback((commentId: number) => {
    setParentCommentId(commentId);
    setIsReplying(true);
  }, []);

  const handleCancelReply = useCallback(() => {
    setParentCommentId(null);
    setIsReplying(false);
  }, []);

  return (
    <div className="fixed top-0 z-50 mx-auto flex h-app w-full max-w-[640px] flex-col bg-gr-white">
      <Topbar type="three" className="flex-none">
        <Topbar.Back onClick={() => router.back()} />
        <Topbar.Title title="피드" />
        <Topbar.Empty />
      </Topbar>
      <div className="flex-1 overflow-y-auto">
        <div className="pb-24 pt-12">
          <FeedDetailContent
            feedDetail={initialFeed}
            onOpenBottomSheet={() => setEditBottomSheet(true)}
            onToggleLike={() => toggleLikeFeed(initialFeed)}
            onToggleBookmark={() => toggleBookmark(initialFeed)}
          />
          {commentsData.length === 0 ? (
            <p className="py-8 text-center text-sm text-gr-300">
              아직 댓글이 없어요
              <br />
              가장 먼저 댓글을 남겨보세요.
            </p>
          ) : (
            <CommentList
              comments={commentsData}
              onOpenBottomSheet={setEditBottomSheet}
              onSelectComment={setSelectedComment}
              onReply={handleReply}
              isReplying={isReplying}
              parentCommentId={parentCommentId}
              feedId={initialFeed.id}
              onCancelReply={handleCancelReply}
            />
          )}
        </div>
      </div>
      <div className="z-[60] flex-none border-t border-gr-100 bg-gr-white shadow-sm">
        {!isReplying && <WriteComment feedId={initialFeed.id} />}
      </div>
      <MoreBtnBottomSheet
        type={selectedComment ? 'comment' : 'feed'}
        isVisible={editBottomSheet}
        setIsVisible={() => setEditBottomSheet(!editBottomSheet)}
        heightPercent={['50%', '60%']}
        name={
          selectedComment
            ? selectedComment?.memberNickname
            : initialFeed?.writerNickname
        }
        memberId={
          selectedComment ? selectedComment?.memberId : initialFeed?.writerId
        }
        onDelete={() => {
          if (selectedComment) {
            deleteComment({
              postId: initialFeed.id,
              commentId: selectedComment.id
            });
          } else {
            deleteFeed(initialFeed);
          }
        }}
        onEdit={() => {
          if (!selectedComment) {
            router.push(`/community/write?edit=${initialFeed.id}`);
          }
        }}
        onBlock={() => {
          if (selectedComment) {
            blockComment(initialFeed.id);
          } else {
            blockFeed(initialFeed);
          }
        }}
        onReport={() => {
          if (selectedComment) {
            reportComment(initialFeed.id, selectedComment.id);
          } else {
            reportFeed(initialFeed);
          }
        }}
      />
    </div>
  );
};

export default CommunityDetailClient;
