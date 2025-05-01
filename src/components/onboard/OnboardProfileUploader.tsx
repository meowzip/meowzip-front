import React, { Dispatch, SetStateAction } from 'react';
import ImageUploader, {
  ImageUploadData
} from '@/components/diary/ImageUploader';
import { DEFAULT_PROFILE_IMAGE_SRC } from '@/constants/general';
import Image from 'next/image';
interface OnboardProfileUploaderProps {
  data: ImageUploadData[];
  setProfileImage: Dispatch<SetStateAction<ImageUploadData[]>>;
}

const FallbackImage = () => {
  return (
    <div className="flex h-[120px] w-[120px] items-center justify-center rounded-[48px] bg-gr-50">
      <Image
        src={DEFAULT_PROFILE_IMAGE_SRC}
        alt="profile"
        width={120}
        height={120}
        style={{
          borderRadius: '48px'
        }}
      />
    </div>
  );
};

const OnboardProfileUploader = ({
  data,
  setProfileImage
}: OnboardProfileUploaderProps) => {
  return (
    <>
      <section className="flex flex-col items-center justify-center gap-2 bg-gr-white px-2 py-3">
        <article className="relative flex h-[120px] w-[120px] items-center justify-center">
          {data?.map(item => (
            <ImageUploader
              key={item.key}
              width="w-[120px]"
              height="h-[120px]"
              radius="rounded-[48px]"
              preview={data[0].imageSrc === null && <FallbackImage />}
              editBtn
              data={item}
              onUpload={setProfileImage}
              images={data}
            />
          ))}
        </article>
      </section>
    </>
  );
};

export default OnboardProfileUploader;
