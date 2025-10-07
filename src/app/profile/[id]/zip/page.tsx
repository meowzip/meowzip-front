import { getClickedUserProfile } from '@/services/profile';
import { getCatsOnServer } from '@/services/cat';
import OtherMemberZipClient from '@/components/zip/OtherMemberZipClient';
import { Metadata } from 'next';
import { PageResponse } from '@/types/infiniteListType';
import { CatListObj } from '@/types/cat';

interface PageProps {
  params: { id: string };
}

export async function generateMetadata({
  params
}: PageProps): Promise<Metadata> {
  const id = Number(params.id);

  if (!params.id || isNaN(id)) {
    return {
      title: '모음집 | 냥집사',
      description: '냥집사 고양이 모음집'
    };
  }

  try {
    const profileData = await getClickedUserProfile(id);

    return {
      title: `${profileData.nickname}님의 모음집 | 냥집사`,
      description: `${profileData.nickname}님이 돌보는 고양이들을 만나보세요`,
      openGraph: {
        title: `${profileData.nickname}님의 모음집`,
        description: `${profileData.nickname}님이 돌보는 고양이들을 만나보세요`,
        images: profileData.profileImageUrl
          ? [profileData.profileImageUrl]
          : [],
        type: 'profile'
      }
    };
  } catch (error) {
    return {
      title: '모음집 | 냥집사',
      description: '냥집사 고양이 모음집'
    };
  }
}

export default async function OtherMemberZipModalPage({ params }: PageProps) {
  const id = Number(params.id);

  // params validation
  if (!params.id || isNaN(id)) {
    throw new Error('유효하지 않은 사용자 ID입니다.');
  }

  try {
    const [profileData, initialCatsData] = await Promise.all([
      getClickedUserProfile(id),
      getCatsOnServer({
        page: 1,
        size: 10,
        memberId: id
      })
    ]);

    return (
      <OtherMemberZipClient
        memberId={id}
        memberName={profileData.nickname}
        initialCatsData={initialCatsData as PageResponse<CatListObj>}
      />
    );
  } catch (error) {
    console.error('모음집 로딩 실패:', error);
    throw error;
  }
}
