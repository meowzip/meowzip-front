import Profile from '@/components/ui/Profile';

interface AlarmListProps {
  alarmList: {
    id: number;
    profiles: {
      id: number;
      imageUrl: string;
      style: string;
    }[];
    user: string;
    content: string;
    createdAt: string;
    read: boolean;
  }[];
}

const AlarmList = ({ alarmList }: AlarmListProps) => {
  return (
    <>
      {alarmList.map((alarm, index) => (
        <div
          key={index}
          className={`flex items-center justify-between border-gr-200 p-4 ${alarm.read ? 'bg-pr-50' : ''}`}
        >
          <div className="flex items-center gap-4">
            <Profile
              items={alarm.profiles}
              lastLeft="left-10"
              width="w-10"
              height="h-10"
            />
            <div>
              <p className="text-body-3 text-gr-900">
                <span className="text-heading-4 text-gr-900">{alarm.user}</span>
                {alarm.content}
              </p>
              <p className="text-body-4 text-gr-400">{alarm.createdAt}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default AlarmList;
