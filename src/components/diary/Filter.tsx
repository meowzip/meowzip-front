import Profile from '@/components/ui/Profile';
import Badge from '@/components/ui/Badge';

interface FilterProps {
  propObj: {
    id: string;
    image: string;
    isCoparented: boolean;
    name?: string;
    coParentedCount: string;
    dDay: string;
    sex: string;
    isNeutered: string;
  };
}

const Filter = ({ propObj }: FilterProps) => {
  return (
    <>
      <section className="flex flex-col items-center justify-center gap-2 bg-gr-white px-2 py-3">
        <button className="relative flex h-16 w-16 items-center justify-center rounded-3xl border-2 border-gr-100 bg-gr-white active:border-pr-500">
          <Profile
            items={[
              {
                id: propObj.id,
                image: propObj.image,
                style: 'w-14 h-14 rounded-[20px] border border-gr-50'
              }
            ]}
          />
          {propObj.isCoparented && (
            <div className="absolute bottom-0 right-0 rounded-full border-15 border-gr-white">
              <Badge
                type="icon"
                icon="/images/icons/share.svg"
                bgColor="bg-gradient-01"
              />
            </div>
          )}
        </button>
        <div className="text-body-4">{propObj.name}</div>
      </section>
    </>
  );
};

export default Filter;
