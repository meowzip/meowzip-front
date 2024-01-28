import ImageUploader from '@/components/diary/ImageUploader';
import Textarea from '@/components/ui/Textarea';
import Topbar from '@/components/ui/Topbar';
import React, { useState } from 'react';

interface FeedWriteModalProps {
  onClose: () => void;
}

const FeedWriteModal = ({ onClose }: FeedWriteModalProps) => {
  const [textareaContent, setTextareaContent] = useState('');

  return (
    <div className="fixed left-0 top-0 z-20 h-screen w-full overflow-y-auto bg-gr-white">
      <Topbar type="modal" title="글쓰기" onClose={onClose} />
      <article className="p-4">
        <Textarea
          propObj={{
            placeholder: '사람들과 나누고 싶은 일들을 공유해보세요!',
            content: textareaContent,
            maxLength: 500
          }}
          onChange={e => setTextareaContent(e)}
        />
      </article>
      <article>
        <h5 className="p-4 text-heading-5 text-gr-900">
          사진 <span className="text-pr-500">0</span>/3
        </h5>
        <div className="flex gap-3 px-4">
          <ImageUploader deleteBtn />
          <ImageUploader deleteBtn />
          <ImageUploader deleteBtn />
        </div>
      </article>
    </div>
  );
};

export default FeedWriteModal;
