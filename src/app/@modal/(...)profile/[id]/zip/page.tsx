'use client';

import OtherMemberZipModal from '@/components/zip/OtherMemberZipModal';
import ZipSkeleton from '@/components/zip/ZipSkeleton';
import { getClickedUserProfile } from '@/services/profile';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export default function OtherMemeberZipModalPage({
  params
}: {
  params: { id: number };
}) {
  const router = useRouter();

  const {
    data: othersProfile,
    isLoading,
    isError,
    error
  } = useQuery({
    queryKey: ['othersProfile', params.id],
    queryFn: () => getClickedUserProfile(params.id)
  });

  if (isLoading) return <ZipSkeleton />;
  if (isError) throw error;

  return (
    <OtherMemberZipModal
      memberId={params.id}
      onClose={() => router.back()}
      memberName={othersProfile.nickname}
    />
  );
}
