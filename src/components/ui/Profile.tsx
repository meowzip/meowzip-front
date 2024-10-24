import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';

interface ProfileProps {
  onClick?: () => void;
  items: {
    id: number;
    imageUrl: string;
    style?: string;
  }[];
  lastLeft?: string;
  width?: string;
  height?: string;
}

const Profile = ({ items, lastLeft, width, height, onClick }: ProfileProps) => {
  const fiveItems = items?.slice(0, 5);

  return (
    <>
      <div className="flex items-center justify-between" onClick={onClick}>
        {fiveItems?.map(item => (
          <Avatar
            key={item.id}
            className={`${item.style} flex items-center text-gr-white`}
          >
            <AvatarImage src={item.imageUrl} />
          </Avatar>
        ))}
        {fiveItems?.length >= 5 && (
          <span className={`absolute ${lastLeft}`}>
            <Avatar
              className={`border-[1.2px] border-gr-white text-gr-white shadow-profile ${width || 'w-10'} ${height || 'h-10'}`}
            >
              <AvatarFallback className="bg-gr-200 text-heading-6">
                {items.length % 5}
              </AvatarFallback>
            </Avatar>
          </span>
        )}
      </div>
    </>
  );
};

export default Profile;
