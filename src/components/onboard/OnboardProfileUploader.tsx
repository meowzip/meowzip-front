import React, { Dispatch, SetStateAction, useEffect } from 'react';
import ImageUploader, {
  ImageUploadData
} from '@/components/diary/ImageUploader';
import { DEFAULT_PROFILE_IMAGE_SRC } from '@/constants/general';

interface OnboardProfileUploaderProps {
  data: ImageUploadData[];
  setProfileImage: Dispatch<SetStateAction<ImageUploadData[]>>;
}

const OnboardProfileUploader = ({
  data,
  setProfileImage
}: OnboardProfileUploaderProps) => {
  useEffect(() => {
    if (data && data.length > 0 && !data[0].croppedImage && !data[0].imageSrc) {
      setProfileImage(prevData =>
        prevData.map(item => ({
          ...item,
          croppedImage: DEFAULT_PROFILE_IMAGE_SRC
        }))
      );
    }
  }, []);

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
