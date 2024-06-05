import {
  blockWriterOnServer,
  deleteFeedOnServer,
  reportFeedOnServer
} from '@/services/community';
import { FeedType } from '@/types/communityType';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useFeedMutations = () => {
  const queryClient = useQueryClient();

  const deleteFeed = (feed: FeedType) => {
    if (!feed) return;
    deleteFeedMutation.mutate(feed?.id);
  };

  const deleteFeedMutation = useMutation({
    mutationFn: (id: number) => deleteFeedOnServer(id),
    onSuccess: (response: any) => {
      if (response.status === 'OK') {
        queryClient.invalidateQueries({ queryKey: ['feeds'] });
      } else {
        console.error('게시물 삭제 중 오류:', response.message);
      }
    },
    onError: (error: any) => {
      console.error('게시물 삭제 중 오류:', error);
    }
  });

  const blockFeed = (feed: FeedType) => {
    if (!feed) return;
    blockFeedMutation.mutate(feed?.id);
  };

  const blockFeedMutation = useMutation({
    mutationFn: (id: number) => blockWriterOnServer(id),
    onSuccess: (response: any) => {
      if (response.status === 'OK') {
        queryClient.invalidateQueries({ queryKey: ['feeds'] });
      } else {
        console.error('게시물 차단 중 오류:', response.message);
      }
    },
    onError: (error: any) => {
      console.error('게시물 차단 중 오류:', error);
    }
  });

  const reportFeed = (feed: FeedType) => {
    if (!feed) return;
    reportFeedMutation.mutate(feed?.id);
  };

  const reportFeedMutation = useMutation({
    mutationFn: (id: number) => reportFeedOnServer(id),
    onSuccess: (response: any) => {
      if (response.status === 'OK') {
        queryClient.invalidateQueries({ queryKey: ['feeds'] });
      } else {
        console.error('게시물 신고 중 오류:', response.message);
      }
    },
    onError: (error: any) => {
      console.error('게시물 신고 중 오류:', error);
    }
  });

  return { deleteFeed, blockFeed, reportFeed };
};

export default useFeedMutations;
