'use client';
import Image from 'next/image';
import { profileImageAtom } from '@/atoms/imageAtom';
import { useAtom } from 'jotai';
import OnboardProfileUploader from '@/components/onboard/OnboardProfileUploader';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import Detail from '@/components/profile/ProfileDetail';
import { getClickedUserProfile, getMyProfile } from '@/services/profile';
import { useEffect } from 'react';

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

  console.log(othersProfile, 'othersProfile');

  return (
    <>
      <div className="flex h-12 w-full items-center justify-between bg-gr-white px-4 align-middle text-heading-3 text-gr-900">
        <h1>프로필</h1>
        <div className="flex gap-3">
          <button onClick={() => router.push('/profile/alarm')}>
            <Image
              src="https://meowzip.s3.ap-northeast-2.amazonaws.com/images/icon/profile/alert.svg"
              alt="edit"
              width={24}
              height={24}
            />
          </button>
          <button onClick={() => router.push('/profile/setting')}>
            <Image
              src="https://meowzip.s3.ap-northeast-2.amazonaws.com/images/icon/profile/setting.svg"
              alt="edit"
              width={24}
              height={24}
            />
          </button>
        </div>
      </div>
      <div className="flex gap-2">
        <OnboardProfileUploader
          data={profileImage}
          setProfileImage={setProfileImage}
        />
        <Detail />
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
      </div>
    </>
  );
};
export default ProfileIdPage;
