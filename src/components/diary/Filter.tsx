import Profile from '@/components/ui/Profile';
import Badge from '@/components/ui/Badge';

interface FilterProps {
  propObj: {
    key: string;
    image: string;
    share: boolean;
  };
}

const Filter = ({ propObj }: FilterProps) => {
  return (
    <>
      <button className="relative flex h-16 w-16 items-center justify-center rounded-3xl border-2 border-gr-100 bg-gr-white active:border-pr-500">
        <Profile
          items={[
            {
              key: propObj.key,
              src: propObj.image,
              style: 'w-14 h-14 rounded-[20px] border border-gr-50'
            }
          ]}
        />
        {propObj.share && (
          <div className="absolute bottom-0 right-0 rounded-full border-15 border-gr-white">
            <Badge
              type="icon"
              icon="/images/icons/share.svg"
              bgColor="bg-gradient-01"
            />
          </div>
        )}
      </button>
    </>
  );
};

export default Filter;
