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

  if (isError) throw error;

  return (
    <>
      {isLoading ? (
        <section className="pb-30 h-screen bg-gr-50 px-4 pt-16">
          <div className="grid grid-cols-2 gap-4 pb-28">
            <ZipSkeleton />
          </div>
        </section>
      ) : (
        <OtherMemberZipModal
          memberId={params.id}
          onClose={() => router.back()}
          memberName={othersProfile.nickname}
        />
      )}
    </>
  );
}
