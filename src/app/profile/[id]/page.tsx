'use client';
import { profileImageAtom } from '@/atoms/imageAtom';
import { useAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import Detail from '@/components/profile/ProfileDetail';
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
      {/* <Detail /> */}
      <section className="flex items-center justify-center self-stretch px-6">
        <div
          className="flex max-w-[100px] flex-1 flex-col items-center justify-center px-4 py-3"
          aria-label="Cat Count"
        >
          <div className="font-bold">20</div>
          <div className="text-gr-600">고양이</div>
        </div>
        <div className="h-5 w-[1px] bg-gr-100" aria-hidden="true"></div>
        <div
          className="flex max-w-[100px] flex-1 flex-col items-center justify-center px-4 py-3"
          aria-label="Post Count"
        >
          <div className="font-bold">100</div>
          <div className="text-gr-600">게시물</div>
        </div>
      </section>
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
