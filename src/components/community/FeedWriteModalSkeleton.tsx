import Topbar from '@/components/ui/Topbar';
import React from 'react';

const FeedWriteModalSkeleton = () => {
  return (
    <div className="fixed left-0 top-0 z-20 h-screen w-full overflow-y-auto bg-gr-white">
      <Topbar type="three">
        <div className="h-6 w-6 animate-pulse rounded bg-gr-100" />
        <div className="h-6 w-16 animate-pulse rounded bg-gr-100" />
        <div className="h-6 w-10 animate-pulse rounded bg-gr-100" />
      </Topbar>
      <div className="mx-auto max-w-[640px] pb-28 pt-12">
        <article className="p-4 pt-14">
          <div className="h-40 w-full animate-pulse rounded-lg bg-gr-100"></div>
        </article>
        <article>
          <div className="mb-3 ml-4 h-5 w-24 animate-pulse rounded bg-gr-100"></div>
          <div className="flex gap-3 px-4">
            <div className="aspect-square w-24 animate-pulse rounded-lg bg-gr-100"></div>
            <div className="aspect-square w-24 animate-pulse rounded-lg bg-gr-100"></div>
            <div className="aspect-square w-24 animate-pulse rounded-lg bg-gr-100"></div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default FeedWriteModalSkeleton;
