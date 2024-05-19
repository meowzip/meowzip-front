'use client';

import React, { useEffect, useState } from 'react';
import FeedCard from '../../components/community/FeedCard';
import FloatingActionButton from '@/components/ui/FloatingActionButton';
import FeedWriteModal from '@/components/community/FeedWriteModal';
import MoreBtnBottomSheet from '@/components/community/MoreBtnBottomSheet';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  blockWriterOnServer,
  deleteFeedOnServer,
  getFeedsOnServer
} from '@/services/community';
import { FeedType } from '@/app/community/communityType';
import { useRouter } from 'next/navigation';

const CommunityPage = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const [editBottomSheet, setEditBottomSheet] = useState(false);
  const [showWriteModal, setShowWriteModal] = useState(false);
  const [feed, setFeed] = useState<FeedType>();

  const { data: feedList } = useQuery({
    queryKey: ['feeds'],
    queryFn: () => getFeedsOnServer(),
    staleTime: 1000 * 60 * 10
  });

  const deleteFeed = () => {
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

  const blockFeed = () => {
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

  useEffect(() => {
    if (showWriteModal) return;
    queryClient.invalidateQueries({ queryKey: ['feeds'] });
  }, [showWriteModal]);

  return (
    <>
      <h1 className="flex h-12 w-full items-center bg-gr-white pl-4 align-middle text-heading-3 text-gr-900">
        커뮤니티
      </h1>
      <div className="pb-32">
        {feedList?.map((feed: FeedType) => (
          <FeedCard
            key={feed.id}
            content={feed}
            goToDetail={() => router.push(`/community/${feed.id}`)}
            openBottomSheet={() => {
              setFeed(feed);
              setEditBottomSheet(true);
            }}
          />
        ))}
        <FloatingActionButton onClick={() => setShowWriteModal(true)} />
        {showWriteModal && (
          <FeedWriteModal
            onClose={() => setShowWriteModal(false)}
            feedDetail={feed}
          />
        )}
        {editBottomSheet && (
          <MoreBtnBottomSheet
            isVisible={editBottomSheet}
            setIsVisible={() => setEditBottomSheet(!editBottomSheet)}
            heightPercent={['50%', '40%']}
            name={feed?.memberNickname}
            memberId={feed?.memberId}
            onDelete={deleteFeed}
            onEdit={() => setShowWriteModal(true)}
            onBlock={blockFeed}
            showWriteModal={setShowWriteModal}
          />
        )}
      </div>
    </>
  );
};

export default CommunityPage;
