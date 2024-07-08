import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CommentType } from '@/types/communityType';
import {
  deleteCommentOnServer,
  blockCommentWriterOnServer,
  reportCommentOnServer,
  registerCommentOnServer
} from '@/services/community';
registerCommentOnServer;

const useCommentMutation = () => {
  const queryClient = useQueryClient();

  const registerComment = (reqObj: {
    parentCommentId: number;
    feedId: number;
    comment: string;
  }) => {
    registerCommentMutation.mutate({
      parentCommentId: reqObj.parentCommentId,
      postId: reqObj.feedId,
      content: reqObj.comment
    });
  };

  const registerCommentMutation = useMutation({
    mutationFn: (reqObj: {
      parentCommentId: number;
      postId: number;
      content: string;
    }) => registerCommentOnServer(reqObj),
    onSuccess: (response: any) => {
      if (response.status === 'OK') {
        queryClient.invalidateQueries({ queryKey: ['comments'] });
      }
    },
    onError: (error: any) => {
      console.error('댓글 등록 중 오류:', error);
    }
  });

  const deleteComment = ({
    postId,
    commentId
  }: {
    postId: number;
    commentId: number;
  }) => {
    if (!commentId) return;
    deleteCommentMutation.mutate({
      postId,
      commentId
    });
  };

  const deleteCommentMutation = useMutation({
    mutationFn: ({
      postId,
      commentId
    }: {
      postId: number;
      commentId: number;
    }) =>
      deleteCommentOnServer({
        postId,
        commentId
      }),
    onSuccess: (response: any) => {
      if (response.status === 'OK') {
        queryClient.invalidateQueries({ queryKey: ['comments'] });
      } else {
        console.error('댓글 삭제 중 오류:', response.message);
      }
    },
    onError: (error: any) => {
      console.error('댓글 삭제 중 오류:', error);
    }
  });

  const reportComment = (postId: number, commentId: number) => {
    if (!commentId) return;
    reportCommentMutation.mutate(
      { postId, commentId },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['comments'] });
        }
      }
    );
  };

  const reportCommentMutation = useMutation({
    mutationFn: ({
      postId,
      commentId
    }: {
      postId: number;
      commentId: number;
    }) => reportCommentOnServer({ postId, commentId }),
    onSuccess: (response: any) => {
      if (response.status === 'OK') {
        queryClient.invalidateQueries({ queryKey: ['comments'] });
      } else {
        console.error('댓글 신고 중 오류:', response.message);
      }
    },
    onError: (error: any) => {
      console.error('댓글 신고 중 오류:', error);
    }
  });

  const blockComment = (postId: number) => {
    if (!postId) return;
    blockCommentMutation.mutate(postId);
  };

  const blockCommentMutation = useMutation({
    mutationFn: (postId: number) => blockCommentWriterOnServer(postId),
    onSuccess: (response: any) => {
      if (response.status === 'OK') {
        queryClient.invalidateQueries({ queryKey: ['comments'] });
      } else {
        console.error('댓글 신고 중 오류:', response.message);
      }
    },
    onError: (error: any) => {
      console.error('댓글 신고 중 오류:', error);
    }
  });

  return {
    deleteComment,
    reportComment,
    blockComment,
    registerComment
  };
};

export default useCommentMutation;
