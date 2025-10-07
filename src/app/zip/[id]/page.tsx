import { getCatDetail } from '@/services/cat';
import ZipDetailClient from '@/components/zip/ZipDetailClient';
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
      title: '고양이 | 냥.zip',
      description: '냥.zip 고양이 프로필'
    };
  }

  try {
    const catDetail = await getCatDetail(id);

    return {
      title: `${catDetail.name} | 냥.zip`,
      description: `${catDetail.age}살, ${catDetail.sex === 'M' ? '남아' : catDetail.sex === 'F' ? '여아' : '성별 미상'}`,
      openGraph: {
        title: `${catDetail.name}`,
        description: `${catDetail.age}살, ${catDetail.sex === 'M' ? '남아' : catDetail.sex === 'F' ? '여아' : '성별 미상'}`,
        images: catDetail.imageUrl ? [catDetail.imageUrl] : [],
        type: 'profile'
      },
      twitter: {
        card: 'summary_large_image',
        title: `${catDetail.name}`,
        description: `${catDetail.age}살, ${catDetail.sex === 'M' ? '남아' : catDetail.sex === 'F' ? '여아' : '성별 미상'}`,
        images: catDetail.imageUrl ? [catDetail.imageUrl] : []
      }
    };
  } catch (error) {
    return {
      title: '고양이 | 냥.zip',
      description: '냥.zip 고양이 프로필'
    };
  }
}

const ZipDiaryPage = async ({ params }: PageProps) => {
  const id = Number(params.id);

  if (!params.id || isNaN(id)) {
    throw new Error('유효하지 않은 고양이 ID입니다.');
  }

  try {
    const catDetail = await getCatDetail(id);

    return <ZipDetailClient catDetail={catDetail} id={id} />;
  } catch (error) {
    console.error('고양이 상세 로딩 실패:', error);
    throw error;
  }
};

export default ZipDiaryPage;
