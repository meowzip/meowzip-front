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
  const { registerComment, isRegisteringComment } = useCommentMutation();
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

  const handleSubmit = async () => {
    if (!comment.trim() || isRegisteringComment) return;

    try {
      await registerComment({
        feedId,
        comment,
        parentCommentId: parentCommentId ?? 0
      });
      setComment('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
      if (onCancel) onCancel();
    } catch (error) {
      console.error('댓글 등록 실패:', error);
    }
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
          <button
            onClick={onCancel}
            className="flex items-center text-gr-600"
            disabled={isRegisteringComment}
          >
            <IoClose size={20} />
          </button>
        </div>
      )}
      <div className="flex items-center justify-center gap-2 border-t border-gray-300 px-4 py-2">
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
            className={`w-full flex-1 resize-none overflow-y-hidden rounded-md bg-gr-50 px-3 py-3 pr-16 text-base text-body-2 focus:outline-none ${
              isRegisteringComment ? 'opacity-50' : ''
            }`}
            rows={1}
            disabled={isRegisteringComment}
          />
          <Button
            onClick={handleSubmit}
            disabled={!comment.trim() || isRegisteringComment}
            className={`absolute right-3 top-1/2 flex h-8 w-12 -translate-y-1/2 items-center justify-center rounded text-sm font-medium ${
              comment.trim() && !isRegisteringComment
                ? 'text-pr-500'
                : 'text-gr-400'
            }`}
          >
            {isRegisteringComment ? (
              <div className="flex items-center gap-1">
                <div className="h-3 w-3 animate-spin rounded-full border-2 border-pr-500 border-t-transparent"></div>
                <span className="text-xs">등록중</span>
              </div>
            ) : (
              '등록'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
