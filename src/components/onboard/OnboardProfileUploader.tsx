import React, { Dispatch, SetStateAction } from 'react';
import ImageUploader from '@/components/diary/ImageUploader';
import { ImageUploadData, profileImageAtom } from '@/atoms/imageAtom';
import { useAtom } from 'jotai';

interface OnboardProfileUploaderProps {
  data: ImageUploadData[];
}
const OnboardProfileUploader = ({ data }: OnboardProfileUploaderProps) => {
  const [profileImage, setProfileImage] = useAtom(profileImageAtom);

  return (
    <>
      <section className="flex flex-col items-center justify-center gap-2 bg-gr-white px-2 py-3">
        <article className="relative flex h-[120px] w-[120px] items-center justify-center ">
          {data.map(item => (
            <ImageUploader
              key={item.key}
              width="w-[120px]"
              height="h-[120px]"
              radius="rounded-[48px]"
              preview={<></>}
              editBtn
              data={item}
              onUpload={setProfileImage}
            />
          ))}
        </article>
      </section>
    </>
  );
};

export default OnboardProfileUploader;
