'use client';
import Image from 'next/image';
import { profileImageAtom } from '@/atoms/imageAtom';
import { useAtom } from 'jotai';
import OnboardProfileUploader from '@/components/onboard/OnboardProfileUploader';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import Detail from '@/components/profile/ProfileDetail';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui/TabsWithLine';
import { getFeedsOnServer } from '@/services/community';
import FeedCard from '@/components/community/FeedCard';
import { FeedType } from '@/types/communityType';

export default function ProfilePage() {
  const [profileImage, setProfileImage] = useAtom(profileImageAtom);
  const router = useRouter();

  const { data: feedList } = useQuery({
    queryKey: ['feeds'],
    queryFn: () => getFeedsOnServer(),
    staleTime: 1000 * 60 * 10
  });

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
        <Tabs
          defaultValue="myContents"
          className="max-w-[390px] sm:max-w-[600px]"
        >
          <OnboardProfileUploader
            data={profileImage}
            setProfileImage={setProfileImage}
          />
          <Detail />
          <TabsList>
            <TabsTrigger value="myContents">작성한 글</TabsTrigger>
            <TabsTrigger value="savedContents">저장한 글</TabsTrigger>
          </TabsList>
          <TabsContent value="myContents">
            {feedList?.map((feed: FeedType) => (
              <FeedCard
                likeFeed={() => {}}
                unLikeFeed={() => {}}
                bookmarkFeed={() => {}}
                cancelBookmarkFeed={() => {}}
                key={feed.id}
                content={feed}
                goToDetail={() => router.push(`/community/${feed.id}`)}
              />
            ))}
          </TabsContent>
          <TabsContent value="savedContents">
            저장한 글 리스트 컴포넌트
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
