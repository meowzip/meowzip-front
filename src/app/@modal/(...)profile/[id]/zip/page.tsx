'use client';

import OtherMemberZipModal from '@/components/zip/OtherMemberZipModal';
import ZipSkeleton from '@/components/zip/ZipSkeleton';
import { getClickedUserProfile } from '@/services/profile';
import { useQuery } from '@tanstack/react-query';
import { useModalAnimation } from '@/hooks/useModalAnimation';

export default function OtherMemeberZipModalPage({
  params
}: {
  params: { id: number };
}) {
  const { handleClose, animationClasses } = useModalAnimation();

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
    <div
      className={`fixed left-1/2 top-0 z-50 h-screen w-full max-w-[640px] -translate-x-1/2 overflow-y-auto bg-gr-white ${animationClasses}`}
    >
      <OtherMemberZipModal
        memberId={params.id}
        onClose={handleClose}
        memberName={othersProfile.nickname}
      />
    </div>
  );
}
