import { Input } from '../../ui/Input';
import Profile from '../../ui/Profile';

export default function WriteComment() {
  return (
    <div className="flex items-center gap-2 px-4 py-2">
      <Profile
        items={[
          {
            id: '1',
            image: 'https://github.com/shadcn.png',
            style: 'w-10 h-10'
          }
        ]}
        lastLeft="left-[100px]"
      />
      <Input
        variant="comment"
        disabled
        suffix="등록"
        placeholder="댓글을 남겨주세요."
      />
    </div>
  );
}
