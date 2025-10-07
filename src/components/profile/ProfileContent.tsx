import Profile from '@/components/ui/Profile';
import ProfileDetail from './ProfileDetail';
import { DEFAULT_PROFILE_IMAGE_SRC } from '@/constants/general';

interface ProfileContentProps {
  id: number;
  profileImageUrl: string;
  catCount: number;
  postCount: number;
}

const ProfileContent = ({
  id,
  profileImageUrl,
  catCount,
  postCount
}: ProfileContentProps) => {
  return (
    <section className="border-b border-gr-100 bg-gr-white py-4">
      <div className="flex justify-center pb-4">
        <Profile
          items={[
            {
              id: id,
              imageUrl: profileImageUrl || DEFAULT_PROFILE_IMAGE_SRC,
              style: 'w-[72px] h-[72px]'
            }
          ]}
          lastLeft="left-[100px]"
        />
      </div>
      <ProfileDetail catCount={catCount} postCount={postCount} />
    </section>
  );
};

export default ProfileContent;
