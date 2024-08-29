'use client';
import { profileImageAtom } from '@/atoms/imageAtom';
import { useAtom } from 'jotai';
import OnboardProfileUploader from '@/components/onboard/OnboardProfileUploader';
import Detail from '@/components/profile/ProfileDetail';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui/TabsWithLine';

export default function ProfilePage() {
  const [profileImage, setProfileImage] = useAtom(profileImageAtom);

  return (
    <>
      <div className="flex h-12 w-full items-center justify-between bg-gr-white px-4 align-middle text-heading-3 text-gr-900">
        <h1>프로필</h1>
        <div>
          <button>버튼1</button>
          <button>버튼2</button>
        </div>
      </div>
      <div className="flex gap-2">
        <Tabs defaultValue="account" className="w-[400px]">
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
            작성한 글 리스트 컴포넌트
          </TabsContent>
          <TabsContent value="savedContents">
            저장한 글 리스트 컴포넌트
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
