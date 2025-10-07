'use client';

import { useRouter } from 'next/navigation';
import Topbar from '@/components/ui/Topbar';
import Button from '@/components/ui/Button';
import useFeedMutations from '@/hooks/community/useFeedMutations';
import ProfileContent from './ProfileContent';
import ProfileFeedList from './ProfileFeedList';
import RightIcon from '../../../public/images/icons/right.svg';

interface ProfileDetailClientProps {
  id: number;
  profileData: {
    nickname: string;
    profileImageUrl: string;
    catCount: number;
    postCount: number;
  };
  feedList: any[];
}

const ProfileDetailClient = ({
  id,
  profileData,
  feedList
}: ProfileDetailClientProps) => {
  const router = useRouter();
  const { toggleLikeFeed, toggleBookmark } = useFeedMutations([
    'otherUserFeeds'
  ]);

  return (
    <>
      <section className="h-12">
        <Topbar type="three">
          <Topbar.Back onClick={() => router.back()} />
          <Topbar.Title title={profileData?.nickname} />
          <Topbar.Empty />
        </Topbar>
      </section>
      <ProfileContent
        id={id}
        profileImageUrl={profileData.profileImageUrl}
        catCount={profileData.catCount}
        postCount={profileData.postCount}
      />
      <div className="w-full border-gr-100" />
      <section className="mx-auto mt-0 max-w-[640px] bg-gr-white">
        <article className="flex items-center justify-between px-4 py-3">
          <div className="text-heading-4 text-gr-900">피드</div>
          <Button
            onClick={() => router.push(`/profile/${id}/zip`)}
            className="h-[28px] rounded-16 bg-gr-50 py-2 pl-3 pr-[6px]"
          >
            <Button.Text
              text="모음집 구경하기"
              className="text-btn-3 text-gr-500"
            />
            <Button.Icon alt="right">
              <RightIcon width={16} height={16} stroke="var(--gr-500)" />
            </Button.Icon>
          </Button>
        </article>
        <ProfileFeedList
          feedList={feedList}
          onToggleLike={toggleLikeFeed}
          onToggleBookmark={toggleBookmark}
        />
      </section>
    </>
  );
};

export default ProfileDetailClient;
