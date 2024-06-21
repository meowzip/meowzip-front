import useCommentMutation from '@/hooks/community/useCommentMutation';
import { Input } from '../../ui/Input';
import Profile from '../../ui/Profile';
import { useState } from 'react';

export default function WriteComment({ feedId }: { feedId: number }) {
  const [comment, setComment] = useState('');
  const { registerComment } = useCommentMutation();

  return (
    <div className="fixed bottom-0 flex w-full items-center gap-2 border-t-[1px] border-gray-300 bg-white px-4 py-2">
      <Profile
        items={[
          {
            id: 1,
            imageUrl: 'https://github.com/shadcn.png',
            style: 'w-10 h-10'
          }
        ]}
        lastLeft="left-[100px]"
      />
      <Input
        variant="comment"
        suffix="등록"
        placeholder="댓글을 남겨주세요."
        onChange={e => setComment(e.target.value)}
        suffixClickHandler={() => {
          registerComment({ feedId, comment });
          setComment('');
        }}
      />
    </div>
  );
}
