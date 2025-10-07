'use client';

import { Fragment } from 'react';
import Comment from './Comment';
import WriteComment from './WriteComment';
import { CommentType } from '@/types/communityType';

interface CommentListProps {
  comments: CommentType[];
  onOpenBottomSheet: (value: boolean) => void;
  onSelectComment: (comment: CommentType) => void;
  onReply: (commentId: number) => void;
  isReplying: boolean;
  parentCommentId: number | null;
  feedId: number;
  onCancelReply: () => void;
}

const CommentList = ({
  comments,
  onOpenBottomSheet,
  onSelectComment,
  onReply,
  isReplying,
  parentCommentId,
  feedId,
  onCancelReply
}: CommentListProps) => {
  return (
    <>
      {comments.map((comment: CommentType) => (
        <div key={comment.id} className="py-3">
          <Comment
            comment={comment}
            setEditBottomSheet={onOpenBottomSheet}
            setSelectedComment={onSelectComment}
            onReply={onReply}
          />
          {isReplying && parentCommentId === comment.id && (
            <WriteComment
              feedId={feedId}
              parentCommentId={parentCommentId}
              onCancel={onCancelReply}
            />
          )}
          {comment.replies?.map((reply: CommentType) => (
            <Fragment key={reply.id}>
              {isReplying && parentCommentId === reply.id && (
                <WriteComment
                  feedId={feedId}
                  parentCommentId={parentCommentId}
                  onCancel={onCancelReply}
                />
              )}
            </Fragment>
          ))}
        </div>
      ))}
    </>
  );
};

export default CommentList;
