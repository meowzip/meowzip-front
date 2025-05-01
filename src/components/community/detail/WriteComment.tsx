import useCommentMutation from '@/hooks/community/useCommentMutation';
import Profile from '../../ui/Profile';
import { useState, useEffect, useRef } from 'react';
import useMyProfileQuery from '@/hooks/common/useMyProfileQuery';
import { IoClose } from 'react-icons/io5';
import Button from '@/components/ui/Button';

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
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (parentCommentId && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [parentCommentId]);

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  const handleSubmit = () => {
    if (!comment.trim()) return;
    registerComment({ feedId, comment, parentCommentId: parentCommentId ?? 0 });
    setComment('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
    if (onCancel) onCancel();
  };

  if (isError) throw error;

  return (
    <div className="fixed bottom-0 z-[100] mx-auto w-full max-w-[640px] bg-white pb-[env(safe-area-inset-bottom)]">
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
      <div className="flex items-end gap-2 border-t border-gray-300 px-4 py-2">
        <Profile
          items={[
            {
              id: 1,
              imageUrl: myProfile?.profileImageUrl,
              style: 'w-10 h-10 flex-shrink-0'
            }
          ]}
          lastLeft="left-[100px]"
        />
        <div className="relative flex-1">
          <textarea
            ref={textareaRef}
            value={comment}
            onChange={handleTextareaChange}
            placeholder={
              parentCommentId ? '답글을 남겨주세요.' : '댓글을 남겨주세요.'
            }
            className="w-full flex-1 resize-none overflow-y-hidden rounded-md bg-gr-50 px-3 py-3 pr-16 text-base text-body-2 focus:outline-none"
            rows={1}
          />
          <Button
            onClick={handleSubmit}
            disabled={!comment.trim()}
            className={`absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium ${
              comment.trim() ? 'text-pr-500' : 'text-gr-400'
            }`}
          >
            등록
          </Button>
        </div>
      </div>
    </div>
  );
}
