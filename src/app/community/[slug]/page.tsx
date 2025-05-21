'use client';

import WriteComment from '@/components/community/detail/WriteComment';
import { Fragment, useEffect, useState, useRef } from 'react';
import FeedCard from '@/components/community/FeedCard';
import Comment from '@/components/community/detail/Comment';
import MoreBtnBottomSheet from '@/components/community/MoreBtnBottomSheet';
import FeedWriteModal from '@/components/community/FeedWriteModal';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getFeedDetail } from '@/services/community';
import Topbar from '@/components/ui/Topbar';
import { useRouter } from 'next/navigation';
import { getFeedComments } from '@/services/community';
import { CommentType } from '@/types/communityType';
import useFeedMutations from '@/hooks/community/useFeedMutations';
import useCommentMutation from '@/hooks/community/useCommentMutation';
import { readNotificationOnServer } from '@/services/profile';
import { useWebView } from '@/hooks/useWebView';

const DetailPage = ({ params: { slug } }: { params: { slug: number } }) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [, setBottomSheetHeight] = useState<number>(0);
  const bottomSheetRef = useRef<HTMLDivElement>(null);

  const [editBottomSheet, setEditBottomSheet] = useState(false);
  const [showWriteModal, setShowWriteModal] = useState(false);
  const [selectedComment, setSelectedComment] = useState<CommentType>();
  const [parentCommentId, setParentCommentId] = useState<number | null>(null);
  const [isReplying, setIsReplying] = useState(false);

  const {
    data: feedDetail,
    isError: isFeedDetailError,
    error: feedDetailError
  } = useQuery({
    queryKey: ['feedDetail', slug],
    queryFn: () => getFeedDetail(slug),
    staleTime: 0
  });

  const {
    data: commentsData,
    isError: isCommentsDataError,
    error: commentsDataError
  } = useQuery({
    queryKey: ['comments', slug],
    queryFn: () => getFeedComments(slug),
    staleTime: 0
  });

  const { deleteFeed, blockFeed, reportFeed, toggleLikeFeed, toggleBookmark } =
    useFeedMutations(['feeds', 'feedDetail']);

  const { blockComment, reportComment, deleteComment } = useCommentMutation();

  const comments = commentsData?.items || [];

  useEffect(() => {
    if (!feedDetail) return;
  }, [slug, feedDetail]);

  useEffect(() => {
    if (bottomSheetRef.current) {
      const height = bottomSheetRef.current.scrollHeight;
      setBottomSheetHeight(height);
    }
  }, [editBottomSheet]);

  const handleReply = (commentId: number) => {
    setParentCommentId(commentId);
    setIsReplying(true);
  };

  const handleCancelReply = () => {
    setParentCommentId(null);
    setIsReplying(false);
  };

  // -------------------- test -------------------- //
  const { safePostMessage } = useWebView();
  const readNotification = useMutation({
    mutationFn: ({ id }: { id: number; type: string }) =>
      readNotificationOnServer(id),
    onSuccess: (data: any, variables: { id: number; type: string }) => {
      if (data.status === 'OK') {
        queryClient.invalidateQueries({
          predicate: query => query.queryKey[0] === 'getNotifications'
        });
      }
    }
  });

  useEffect(() => {
    const storedClickNoti = localStorage.getItem('click_noti') || '';
    const parsedNotification = storedClickNoti
      ? JSON.parse(storedClickNoti)
      : null;
    if (!parsedNotification || parsedNotification.type !== 'COMMUNITY') return;
    readNotification.mutate({
      id: Number(parsedNotification['notification-id']),
      type: parsedNotification.type
    });
    safePostMessage({
      type: 'NOTIFICATION_CLICKED',
      notification: parsedNotification,
      timestamp: 123123
    });
  }, []);
  // -------------------- test -------------------- //

  if (isFeedDetailError) throw feedDetailError;
  if (isCommentsDataError) throw commentsDataError;

  return (
    <div className="fixed top-0 z-50 mx-auto flex h-app w-full max-w-[640px] flex-col bg-gr-white">
      <Topbar type="three" className="flex-none">
        <Topbar.Back onClick={() => router.back()} />
        <Topbar.Title title="피드" />
        <Topbar.Empty />
      </Topbar>
      <div className="flex-1 overflow-y-auto">
        <div className="pb-24 pt-12">
          <FeedCard
            variant="detail"
            content={feedDetail}
            openBottomSheet={() => {
              setEditBottomSheet(true);
            }}
            toggleLikeFeed={() => toggleLikeFeed(feedDetail)}
            toggleBookmark={() => toggleBookmark(feedDetail)}
            hasUserArea
          />
          {comments.length === 0 && (
            <p className="py-8 text-center text-sm text-gr-300">
              아직 댓글이 없어요
              <br />
              가장 먼저 댓글을 남겨보세요.
            </p>
          )}

          {comments.map((comment: CommentType) => (
            <div key={comment.id} className="py-3">
              <Comment
                comment={comment}
                setEditBottomSheet={setEditBottomSheet}
                setSelectedComment={setSelectedComment}
                onReply={handleReply}
              />
              {isReplying && parentCommentId === comment.id && (
                <WriteComment
                  feedId={feedDetail?.id}
                  parentCommentId={parentCommentId}
                  onCancel={handleCancelReply}
                />
              )}
              {comment.replies?.map((reply: CommentType) => (
                <Fragment key={reply.id}>
                  {isReplying && parentCommentId === reply.id && (
                    <WriteComment
                      feedId={feedDetail?.id}
                      parentCommentId={parentCommentId}
                      onCancel={handleCancelReply}
                    />
                  )}
                </Fragment>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="z-[60] flex-none border-t border-gr-100 bg-gr-white shadow-sm">
        {!isReplying && <WriteComment feedId={feedDetail?.id} />}
      </div>
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
        heightPercent={['50%', '60%']}
        name={feedDetail?.memberNickname}
        memberId={
          selectedComment ? selectedComment?.memberId : feedDetail?.memberId
        }
        onDelete={() => {
          selectedComment
            ? deleteComment({
                postId: feedDetail?.id,
                commentId: selectedComment?.id
              })
            : deleteFeed(feedDetail);
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
        showWriteModal={
          selectedComment ? undefined : () => setShowWriteModal(true)
        }
      />
    </div>
  );
};

export default DetailPage;
