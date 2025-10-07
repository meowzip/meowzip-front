import { getDiaryDetail } from '@/services/diary';
import DiaryDetailClient from '@/components/diary/DiaryDetailClient';
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
      title: '일지 | 냥.zip',
      description: '냥.zip 일지'
    };
  }

  try {
    const diaryDetail = await getDiaryDetail(id);

    return {
      title: `${diaryDetail.caredDate} 일지 | 냥.zip`,
      description: diaryDetail.content.slice(0, 100) + '...',
      openGraph: {
        title: `${diaryDetail.caredDate} 일지`,
        description: diaryDetail.content.slice(0, 100) + '...',
        images: diaryDetail.images?.length > 0 ? diaryDetail.images : [],
        type: 'article'
      },
      twitter: {
        card: 'summary_large_image',
        title: `${diaryDetail.caredDate} 일지`,
        description: diaryDetail.content.slice(0, 100) + '...',
        images: diaryDetail.images?.length > 0 ? diaryDetail.images : []
      }
    };
  } catch (error) {
    return {
      title: '일지 | 냥.zip',
      description: '냥.zip 일지'
    };
  }
}

const DiaryDetailPage = async ({ params }: PageProps) => {
  const id = Number(params.id);

  if (!params.id || isNaN(id)) {
    throw new Error('유효하지 않은 일지 ID입니다.');
  }

  try {
    const diaryDetail = await getDiaryDetail(id);

    return <DiaryDetailClient diaryDetail={diaryDetail} id={id} />;
  } catch (error) {
    console.error('일지 상세 로딩 실패:', error);
    throw error;
  }
};

export default DiaryDetailPage;
