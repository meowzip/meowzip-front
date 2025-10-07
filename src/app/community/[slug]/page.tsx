import { getFeedDetail, getFeedComments } from '@/services/community';
import CommunityDetailClient from '@/components/community/detail/CommunityDetailClient';
import { FeedType, CommentType } from '@/types/communityType';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({
  params
}: PageProps): Promise<Metadata> {
  if (params.slug === 'write') {
    return {
      title: '피드 작성 | 냥.zip',
      description: '냥.zip 커뮤니티 피드 작성'
    };
  }

  const slug = Number(params.slug);

  if (!params.slug || isNaN(slug)) {
    return {
      title: '피드 | 냥.zip',
      description: '냥.zip 커뮤니티 피드'
    };
  }

  try {
    const feedDetail = await getFeedDetail(slug);

    return {
      title: `${feedDetail.writerNickname}님의 피드 | 냥.zip`,
      description: feedDetail.content.slice(0, 100) + '...',
      openGraph: {
        title: `${feedDetail.writerNickname}님의 피드`,
        description: feedDetail.content.slice(0, 100) + '...',
        images: feedDetail.images?.length > 0 ? feedDetail.images : [],
        type: 'article'
      },
      twitter: {
        card: 'summary_large_image',
        title: `${feedDetail.writerNickname}님의 피드`,
        description: feedDetail.content.slice(0, 100) + '...',
        images: feedDetail.images?.length > 0 ? feedDetail.images : []
      }
    };
  } catch (error) {
    return {
      title: '피드 | 냥.zip',
      description: '냥.zip 커뮤니티 피드'
    };
  }
}

const DetailPage = async ({ params }: PageProps) => {
  if (
    params.slug === 'write' ||
    params.slug === 'null' ||
    params.slug === 'undefined'
  ) {
    notFound();
  }

  const slug = Number(params.slug);

  if (!params.slug || isNaN(slug) || slug <= 0) {
    notFound();
  }

  try {
    const [feedDetail, commentsData] = await Promise.all([
      getFeedDetail(slug),
      getFeedComments(slug)
    ]);

    const comments = (commentsData as any)?.items || [];

    return (
      <CommunityDetailClient
        feedDetail={feedDetail as FeedType}
        comments={comments as CommentType[]}
        slug={slug}
      />
    );
  } catch (error) {
    console.error('피드 상세 로딩 실패:', error);
    throw error;
  }
};

export default DetailPage;
