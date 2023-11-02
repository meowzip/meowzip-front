import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';

interface ProfileProps {
  items: {
    key: string;
    src: string;
    style: string;
  }[];
  lastLeft?: string;
}

const Profile = ({ items, lastLeft }: ProfileProps) => {
  const fiveItems = items.slice(0, 5);

  return (
    <>
      <div className="relative">
        {fiveItems.map(item => (
          <Avatar key={item.key} className={`${item.style} text-gr-white`}>
            <AvatarImage src={item.src} />
          </Avatar>
        ))}
        {fiveItems.length >= 5 && (
          <div className={`absolute top-0 h-10 w-10 ${lastLeft}`}>
            <Avatar className={`text-gr-white`}>
              <AvatarFallback className="bg-gr-200 text-heading-6">
                +{items.length % 5}
              </AvatarFallback>
            </Avatar>
          </div>
        )}
      </div>
    </>
  );
};

export default Profile;
