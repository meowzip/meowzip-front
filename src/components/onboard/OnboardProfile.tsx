import React from 'react';
import Badge from '../../components/ui/Badge';
import ImageUploader from '@/components/diary/ImageUploader';

interface OnboardProfileProps {
  propObj: {
    edit: boolean;
  };
}

const OnboardProfile = ({ propObj }: OnboardProfileProps) => {
  return (
    <>
      <section className="flex flex-col items-center justify-center gap-2 bg-gr-white px-2 py-3">
        <article className="relative flex h-[120px] w-[120px] items-center justify-center ">
          <ImageUploader
            width="w-[120px]"
            height="h-[120px]"
            radius="rounded-[48px]"
            preview={<></>}
          />
          {propObj.edit && (
            <div className="absolute bottom-0 right-0 rounded-16">
              <Badge
                type="icon"
                icon="/images/icons/pencil.svg"
                bgColor="bg-gr-700"
                iconStyle="p-1 border-gr-white border-[1.5px] border-gr-white rounded-full"
              />
            </div>
          )}
        </article>
      </section>
    </>
  );
};

export default OnboardProfile;
