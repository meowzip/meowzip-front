'use client';

import { useRouter } from 'next/navigation';
import FeedCard from '@/components/community/FeedCard';
import { FeedType } from '@/types/communityType';

interface ProfileFeedListProps {
  feedList: FeedType[];
  onToggleLike: (feed: FeedType) => void;
  onToggleBookmark: (feed: FeedType) => void;
}

const ProfileFeedList = ({
  feedList,
  onToggleLike,
  onToggleBookmark
}: ProfileFeedListProps) => {
  const router = useRouter();

  return (
    <article>
      {feedList.map((feed: FeedType) => (
        <FeedCard
          key={feed.id}
          content={feed}
          goToDetail={() => {
            router.push(`/community/${feed.id}`);
          }}
          toggleLikeFeed={() => onToggleLike(feed)}
          toggleBookmark={() => onToggleBookmark(feed)}
        />
      ))}
    </article>
  );
};

export default ProfileFeedList;
