import { getClickedUserProfile, getOtherUserFeeds } from '@/services/profile';
import ProfileDetailClient from '@/components/profile/ProfileDetailClient';
import { Metadata } from 'next';

interface PageProps {
  params: { id: string };
}

export async function generateMetadata({
  params
}: PageProps): Promise<Metadata> {
  const id = Number(params.id);

  if (!params.id || isNaN(id)) {
    return {
      title: '프로필 | 냥집사',
      description: '냥집사 유저 프로필'
    };
  }

  try {
    const profileData = await getClickedUserProfile(id);

    return {
      title: `${profileData.nickname}님의 프로필 | 냥집사`,
      description: `고양이 ${profileData.catCount}마리, 게시물 ${profileData.postCount}개`,
      openGraph: {
        title: `${profileData.nickname}님의 프로필`,
        description: `고양이 ${profileData.catCount}마리, 게시물 ${profileData.postCount}개`,
        images: profileData.profileImageUrl
          ? [profileData.profileImageUrl]
          : [],
        type: 'profile'
      },
      twitter: {
        card: 'summary',
        title: `${profileData.nickname}님의 프로필`,
        description: `고양이 ${profileData.catCount}마리, 게시물 ${profileData.postCount}개`,
        images: profileData.profileImageUrl ? [profileData.profileImageUrl] : []
      }
    };
  } catch (error) {
    return {
      title: '프로필 | 냥집사',
      description: '냥집사 유저 프로필'
    };
  }
}

const ProfileIdPage = async ({ params }: PageProps) => {
  const id = Number(params.id);

  // params validation
  if (!params.id || isNaN(id)) {
    throw new Error('유효하지 않은 사용자 ID입니다.');
  }

  const feedReqObj = {
    page: 0,
    size: 9,
    memberId: id
  };

  try {
    const [profileData, feedList] = await Promise.all([
      getClickedUserProfile(id),
      getOtherUserFeeds(feedReqObj)
    ]);

    return (
      <ProfileDetailClient
        id={id}
        profileData={profileData}
        feedList={feedList || []}
      />
    );
  } catch (error) {
    console.error('프로필 로딩 실패:', error);
    throw error;
  }
};

export default ProfileIdPage;
