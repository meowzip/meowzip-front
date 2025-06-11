import FeedWriteModalSkeleton from '@/components/community/FeedWriteModalSkeleton';

export default function CommunityWriteModalLoading() {
  return (
    <div className="fixed left-1/2 top-0 z-50 h-screen w-full max-w-[640px] -translate-x-1/2 overflow-y-auto bg-gr-white">
      <FeedWriteModalSkeleton />
    </div>
  );
}
