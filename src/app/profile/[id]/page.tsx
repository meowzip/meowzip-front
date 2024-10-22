'use client';
import { profileImageAtom } from '@/atoms/imageAtom';
import { useAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import ProfileDetail from '@/components/profile/ProfileDetail';
import { getClickedUserProfile } from '@/services/profile';
import Profile from '@/components/ui/Profile';
import Topbar from '@/components/ui/Topbar';

const ProfileIdPage = ({ params: { id } }: { params: { id: number } }) => {
  const [profileImage, setProfileImage] = useAtom(profileImageAtom);
  const router = useRouter();

  const feedReqObj = {
    page: 0,
    size: 9
  };

  const { data: othersProfile } = useQuery({
    queryKey: ['othersProfile'],
    queryFn: () => getClickedUserProfile(id)
  });

  const goBackTo = () => {
    console.log('go back to community');
  };

  console.log(othersProfile, 'othersProfile');

  return (
    <>
      <section className="h-12">
        <Topbar type="three">
          <Topbar.Back onClick={goBackTo} />
          <Topbar.Title title={othersProfile?.nickname} />
          <Topbar.Empty />
        </Topbar>
      </section>
      <section className="flex justify-center py-4">
        <Profile
          items={[
            {
              id: id,
              imageUrl: othersProfile?.profileImageUrl,
              style: 'w-[72px] h-[72px]'
            }
          ]}
          lastLeft="left-[100px]"
        />
      </section>
      <ProfileDetail
        catCount={othersProfile?.catCount}
        postCount={othersProfile?.postCount}
      />

      {/* {myFeedList?.map((feed: FeedType) => (
              <FeedCard
                likeFeed={() => {}}
                unLikeFeed={() => {}}
                bookmarkFeed={() => {}}
                cancelBookmarkFeed={() => {}}
                key={feed.id}
                content={feed}
                goToDetail={() => router.push(`/community/${feed.id}`)}
              />
            ))} */}
    </>
  );
};
export default ProfileIdPage;
