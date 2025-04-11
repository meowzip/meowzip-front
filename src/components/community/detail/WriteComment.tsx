import useCommentMutation from '@/hooks/community/useCommentMutation';
import { Input } from '../../ui/Input';
import Profile from '../../ui/Profile';
import { useState, useEffect, useRef } from 'react';
import useMyProfileQuery from '@/hooks/common/useMyProfileQuery';
import { IoClose } from 'react-icons/io5';

export default function WriteComment({
  feedId,
  parentCommentId,
  onCancel
}: {
  feedId: number;
  parentCommentId?: number;
  onCancel?: () => void;
}) {
  const [comment, setComment] = useState('');
  const { registerComment } = useCommentMutation();
  const { data: myProfile, isError, error } = useMyProfileQuery();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (parentCommentId && inputRef.current) {
      inputRef.current.focus();
    }
  }, [parentCommentId]);

  const handleSubmit = () => {
    registerComment({ feedId, comment, parentCommentId: parentCommentId ?? 0 });
    setComment('');
    if (onCancel) onCancel();
  };

  if (isError) throw error;

  return (
    <div className="fixed bottom-0 z-[100] mx-auto w-full max-w-[640px] bg-white">
      {parentCommentId && (
        <div className="flex items-center justify-between border-t border-gray-300 px-4 py-2">
          <div className="flex items-center gap-2">
            <div className="h-4 w-1 rounded-full bg-pr-500" />
            <span className="text-body-3 text-gr-600">답글 작성 중</span>
          </div>
          <button onClick={onCancel} className="flex items-center text-gr-600">
            <IoClose size={20} />
          </button>
        </div>
      )}
      <div className="flex items-center gap-2 border-t border-gray-300 px-4 py-2">
        <Profile
          items={[
            {
              id: 1,
              imageUrl: myProfile?.profileImageUrl,
              style: 'w-10 h-10'
            }
          ]}
          lastLeft="left-[100px]"
        />
        <Input
          variant="comment"
          suffix="등록"
          value={comment}
          placeholder={
            parentCommentId ? '답글을 남겨주세요.' : '댓글을 남겨주세요.'
          }
          onChange={e => setComment(e.target.value)}
          suffixClickHandler={handleSubmit}
          suffixClassName={comment ? 'text-pr-500' : 'text-gr-300'}
          ref={inputRef}
        />
      </div>
    </div>
  );
}
