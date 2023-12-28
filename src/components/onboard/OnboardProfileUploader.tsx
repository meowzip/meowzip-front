import React from 'react';
import ImageUploader from '@/components/diary/ImageUploader';

const OnboardProfileUploader = () => {
  return (
    <>
      <section className="flex flex-col items-center justify-center gap-2 bg-gr-white px-2 py-3">
        <article className="relative flex h-[120px] w-[120px] items-center justify-center ">
          <ImageUploader
            width="w-[120px]"
            height="h-[120px]"
            radius="rounded-[48px]"
            preview={<></>}
            editBtn
          />
        </article>
      </section>
    </>
  );
};

export default OnboardProfileUploader;
