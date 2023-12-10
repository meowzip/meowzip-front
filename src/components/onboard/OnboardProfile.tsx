import React from 'react';
import Profile from '../../components/ui/Profile';
import Badge from '../../components/ui/Badge';

interface OnboardProfileProps {
  propObj: {
    edit: boolean;
  };
}

const OnboardProfile = ({ propObj }: OnboardProfileProps) => {
  return (
    <>
      <section className="flex flex-col items-center justify-center gap-2 bg-gr-white px-2 py-3">
        <button className="relative flex h-16 w-16 items-center justify-center rounded-3xl border-2 border-gr-100 bg-gr-white active:border-pr-500">
          <Profile
            items={[
              {
                id: '1',
                image: 'https://github.com/shadcn.png',
                style: 'w-14 h-14 rounded-[20px] border border-gr-50'
              }
            ]}
          />
          {propObj.edit && (
            <div className="absolute bottom-0 right-0 rounded-full border-15 border-gr-white">
              <Badge
                type="icon"
                icon="/images/icons/pencil.svg"
                bgColor="bg-gradient-01"
              />
            </div>
          )}
        </button>
      </section>
    </>
  );
};

export default OnboardProfile;
