import Profile from '@/components/ui/Profile';
import React from 'react';
import Image from 'next/image';

interface UserProps {
  nickname: string;
  profile: string;
  onClick: () => void;
}

const UserArea = ({ nickname, profile, onClick }: UserProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center justify-start gap-3">
        <Profile items={[{ id: 1, imageUrl: profile, style: 'w-10 h-10' }]} />
        <div className="flex flex-col justify-between">
          <h5 className="text-heading-4 text-gr-900">{nickname}</h5>
          <h6 className="text-body-4 text-gr-400">5분 전</h6>
        </div>
      </div>
      <Image
        src="/images/icons/menu.svg"
        alt="calendar"
        width={24}
        height={24}
        className="h-6 w-6"
        onClick={e => {
          e.stopPropagation();
          onClick();
        }}
      />
    </div>
  );
};

export default UserArea;
