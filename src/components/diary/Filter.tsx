import Profile from '../ui/Profile';

interface FilterProps {
  propObj: {
    key: string;
    image: string;
  };
}

const Filter = ({ propObj }: FilterProps) => {
  return (
    <>
      <div className="rounded-3xl border-2 border-pr-500 w-16 h-16 bg-gr-white flex justify-center items-center">
        <Profile
          items={[
            {
              key: propObj.key,
              src: propObj.image,
              style: 'w-14 h-14 rounded-[20px] border border-gr-50'
            }
          ]}
          lastLeft="left-[100px]"
        />
      </div>
    </>
  );
};

export default Filter;
