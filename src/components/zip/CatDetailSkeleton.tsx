import { Skeleton } from '@/components/ui/Skeleton';
import Image from 'next/image';

const CatDetailSkeleton = () => {
  return (
    <div className="mx-auto flex h-screen max-w-[640px] flex-col gap-4 overflow-auto bg-gr-50 px-4 pb-32 pt-[72px]">
      <div className="mb-4 rounded-16">
        <Image
          src="/images/zip-card.svg"
          alt="zip-card"
          width={380}
          height={380}
          className="w-full"
        />
        <div className="rounded-b-16 bg-white px-6">
          <div className="flex flex-col items-center justify-center gap-1 pb-4 pt-2">
            <Skeleton className="mb-1 h-6 w-32 rounded" />
            <Skeleton className="mb-1 h-6 w-32 rounded" />
          </div>
          <div className="mb-2 aspect-[380/220] max-h-60 w-full">
            <Skeleton className="h-full w-full rounded-xl object-cover" />
          </div>
          <div className="pb-6 pt-4">
            <div className="flex items-center gap-2 py-2">
              <Skeleton className="h-5 w-20 rounded" />
              <Skeleton className="h-5 w-full rounded" />
            </div>
            <div className="flex gap-2 py-2">
              <Skeleton className="h-5 w-20 rounded" />
              <Skeleton className="h-5 w-full rounded" />
            </div>
            <div className="flex gap-2 py-2">
              <Skeleton className="h-5 w-20 rounded" />
              <Skeleton className="h-5 w-full rounded" />
            </div>
            <div className="flex gap-2 py-2">
              <Skeleton className="h-5 w-20 rounded" />
              <Skeleton className="h-5 w-full rounded" />
            </div>
          </div>
        </div>
      </div>

      <div className="mb-4 rounded-16 bg-white p-4">
        <div className="mb-2">
          <Skeleton className="h-8 w-32 rounded" />
        </div>
        <div className="mb-4 flex gap-2 pt-2">
          {[1, 2, 3].map(i => (
            <Skeleton key={i} className="h-16 w-16 rounded-full" />
          ))}
        </div>
        <div className="flex justify-center">
          <Skeleton className="h-8 w-full rounded" />
        </div>
      </div>

      <div className="rounded-16 bg-white p-4">
        <div className="mb-2">
          <Skeleton className="h-8 w-32 rounded" />
        </div>
        <div className="flex flex-col gap-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex items-center gap-3">
              <Skeleton className="rounded-8 h-14 w-14" />
              <div className="flex-1">
                <Skeleton className="mb-2 h-4 w-28 rounded" />
                <Skeleton className="h-3 w-20 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CatDetailSkeleton;
